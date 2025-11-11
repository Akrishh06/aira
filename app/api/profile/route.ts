import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { validateProfile } from '@/lib/parameters'

const updateProfileSchema = z.object({
  params: z.record(z.union([z.literal(0), z.literal(1)])),
})

// GET /api/profile - Get user's profile
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error('Get profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/profile - Update user's profile parameters
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { params } = updateProfileSchema.parse(body)

    // Validate profile structure
    if (!validateProfile(params)) {
      return NextResponse.json(
        { error: 'Invalid profile format' },
        { status: 400 }
      )
    }

    // Update profile
    const profile = await prisma.profile.update({
      where: { userId: session.user.id },
      data: { params },
    })

    return NextResponse.json({ success: true, profile })
  } catch (error) {
    console.error('Update profile error:', error)
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
