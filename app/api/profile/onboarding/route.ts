import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { computeProfileFromAnswers, validateAnswers, Answer } from '@/lib/onboarding'
import { z } from 'zod'

const onboardingSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string(),
      value: z.union([z.string(), z.number(), z.boolean()]),
    })
  ),
})

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse and validate request body
    const body = await request.json()
    const { answers } = onboardingSchema.parse(body)

    // Validate all questions are answered
    const validation = validateAnswers(answers as Answer[])
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: 'Missing answers',
          missing: validation.missing,
        },
        { status: 400 }
      )
    }

    // Compute profile from answers
    const { profile, scorecard } = computeProfileFromAnswers(answers as Answer[])

    // Save profile to database (upsert)
    const savedProfile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        params: profile,
        scorecard,
        paramVersion: 1,
      },
      create: {
        userId: session.user.id,
        params: profile,
        scorecard,
        paramVersion: 1,
      },
    })

    return NextResponse.json({
      success: true,
      profile: savedProfile,
    })
  } catch (error) {
    console.error('Onboarding error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
