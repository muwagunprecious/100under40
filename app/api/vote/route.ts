import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { nomineeId } = await request.json();
        if (!nomineeId) {
            return NextResponse.json({ error: 'Nominee ID is required' }, { status: 400 });
        }

        const [updatedNominee] = await sql`
            UPDATE "VoteNominee"
            SET "votesCount" = "votesCount" + 1
            WHERE id = ${nomineeId}
            RETURNING *
        `;

        if (!updatedNominee) {
            return NextResponse.json({ error: 'Nominee not found' }, { status: 404 });
        }

        return NextResponse.json(updatedNominee);
    } catch (error) {
        console.error('Failed to record vote:', error);
        return NextResponse.json({ error: 'Failed to record vote' }, { status: 500 });
    }
}
