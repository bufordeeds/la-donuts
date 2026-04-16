import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Delete all existing users
    await payload.delete({
      collection: 'users',
      where: {},
    })

    // Create new admin user
    await payload.create({
      collection: 'users',
      data: {
        email: 'hello@buford.dev',
        password: 'SkateLandWest2025!',
        name: 'Admin User',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully!',
      credentials: {
        email: 'hello@buford.dev',
        password: 'SkateLandWest2025!',
        loginUrl: '/admin',
      },
    })
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      {
        status: 500,
      },
    )
  }
}
