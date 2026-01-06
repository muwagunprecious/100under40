import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const voteSchema = z.object({
    nomineeId: z.string().min(1),
    // In a real app with auth, we'd get email from session
    // For public voting, we might capture email or just rely on IP (naive) or a cookie
    voterEmail: z.string().email().optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validation = voteSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid vote data' },
                { status: 400 }
            );
        }

        const { nomineeId, voterEmail } = validation.data;

        // Get IP address (naive approach for demo)
        const ip = request.headers.get('x-forwarded-for') || 'unknown';

        // Check for duplicate vote by IP for this nominee
        // Note: In production, use stricter fingerprinting or require email verification
        const existingVote = await prisma.vote.findFirst({
            where: {
                nomineeId,
                voterIp: ip,
            }
        });

        if (existingVote) {
            return NextResponse.json(
                { error: 'You have already voted for this nominee' },
                { status: 409 }
            );
        }

        // Record vote
        await prisma.vote.create({
            data: {
                nomineeId,
                voterIp: ip,
                voterEmail: voterEmail, // Optional
            }
        });

        return NextResponse.json(
            { message: 'Vote recorded successfully' },
            { status: 201 }
        );

    } catch (error) {
        console.error('Vote error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// CRITICAL: Ensure we DO NOT expose a public GET endpoint for vote counts
// Admin specific endpoints will handle that securely
