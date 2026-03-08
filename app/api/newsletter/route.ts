import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { z } from 'zod';

const newsletterSchema = z.object({
    email: z.string().email('Invalid email address'),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input
        const validatedData = newsletterSchema.parse(body);

        // Check if email already exists
        const existing = await sql`
            SELECT id FROM "Newsletter" WHERE email = ${validatedData.email}
        `;

        if (existing.length > 0) {
            return NextResponse.json(
                { message: 'You are already subscribed to our newsletter!' },
                { status: 200 }
            );
        }

        // Create the subscription
        await sql`
            INSERT INTO "Newsletter" (email)
            VALUES (${validatedData.email})
        `;

        return NextResponse.json(
            { message: 'Thank you for subscribing to our newsletter!' },
            { status: 201 }
        );

    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 }
            );
        }
        console.error('Newsletter signup error:', error);
        return NextResponse.json(
            { error: 'Failed to subscribe. Please try again later.' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const subscribers = await sql`
            SELECT * FROM "Newsletter" ORDER BY "createdAt" DESC
        `;
        return NextResponse.json(subscribers);
    } catch (error) {
        console.error('Failed to fetch subscribers:', error);
        return NextResponse.json(
            { error: 'Failed to fetch subscribers' },
            { status: 500 }
        );
    }
}
