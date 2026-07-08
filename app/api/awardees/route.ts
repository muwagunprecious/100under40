import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
    try {
        const awardees = await sql`
            SELECT * FROM "Awardee" ORDER BY "createdAt" DESC
        `;
        return NextResponse.json(awardees);
    } catch (error) {
        console.error('Failed to fetch awardees:', error);
        return NextResponse.json({ error: 'Failed to fetch awardees' }, { status: 500 });
    }
}
