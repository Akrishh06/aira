import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const saveResponseSchema = z.object({
  inputText: z.string(),
  outputText: z.string(),
  notes: z.string().optional(),
})

// GET /api/responses - Get user's response history
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const responses = await prisma.response.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 50, // Limit to last 50
    })

    return NextResponse.json({ responses })
  } catch (error) {
    console.error('Get responses error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/responses - Save a new response to history
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { inputText, outputText, notes } = saveResponseSchema.parse(body)

    // Get current profile for snapshot
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    })

    const response = await prisma.response.create({
      data: {
        userId: session.user.id,
        inputText,
        outputText,
        notes,
        paramsSnapshot: profile?.params || {},
      },
    })

    return NextResponse.json({ success: true, response })
  } catch (error) {
    console.error('Save response error:', error)
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
