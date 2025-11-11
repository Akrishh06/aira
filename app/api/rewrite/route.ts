import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const rewriteSchema = z.object({
  inputText: z.string().min(10),
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { inputText } = rewriteSchema.parse(body)

    // Get user's profile
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    })

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found. Please complete onboarding.' },
        { status: 404 }
      )
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured. Please set OPENAI_API_KEY.' },
        { status: 503 }
      )
    }

    // Build the system prompt with profile parameters
    const activeParams = Object.entries(profile.params as Record<string, number>)
      .filter(([_, value]) => value === 1)
      .map(([key, _]) => key)

    const inactiveParams = Object.entries(profile.params as Record<string, number>)
      .filter(([_, value]) => value === 0)
      .map(([key, _]) => key)

    const systemPrompt = `You are AIRA's rewrite engine. You must strictly shape writing to match a user's binary profile flags.

USER_PROFILE_PARAMS:
Active (1): ${activeParams.join(', ')}
Inactive (0): ${inactiveParams.join(', ')}

TASK:
Rewrite the following text so it reflects the active (1) parameters. Inactive (0) parameters should be avoided.

CONSTRAINTS:
- Respect audience flags (A_*) when choosing vocabulary and depth.
- Respect safety flags (C_*) by removing or softening problematic claims and adding disclaimers when required.
- Respect formatting flags (F_*), including Markdown usage and heading conventions.
- Use active voice if S_active==1 and limit passive voice when S_passive==0.
- If F_reading_grade8==1, target grade ~8 readability.
- If T_concise==1, prefer shorter sentences and fewer words.
- If S_bullets==1 or R_checklists==1, present appropriate lists.
- If R_summary==1, add a short summary block near the top.
- If S_citations==1, include [CITATION NEEDED] placeholders instead of real links.
- If X_variants==1, you'll be called multiple times to create variants.

OUTPUT FORMAT:
Return only the rewritten text. Do not include explanations or meta-commentary.`

    // Determine if we should generate variants
    const shouldGenerateVariants = (profile.params as any).X_variants === 1
    const numVariants = shouldGenerateVariants ? 3 : 1

    // Call OpenAI API
    const variants: string[] = []

    for (let i = 0; i < numVariants; i++) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: inputText },
          ],
          temperature: i === 0 ? 0.4 : 0.7, // First variant more deterministic
          max_tokens: 2000,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        console.error('OpenAI API error:', error)
        throw new Error('AI service error')
      }

      const data = await response.json()
      const rewrittenText = data.choices[0]?.message?.content || ''
      variants.push(rewrittenText.trim())
    }

    return NextResponse.json({
      variants,
      activeParams,
      inactiveParams,
    })
  } catch (error) {
    console.error('Rewrite error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
