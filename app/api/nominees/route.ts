import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (id) {
            const nominees = await sql`
                SELECT * FROM "VoteNominee" WHERE id = ${id}
            `;
            if (nominees.length === 0) {
                return NextResponse.json({ error: 'Nominee not found' }, { status: 404 });
            }
            return NextResponse.json(nominees[0]);
        }

        const nominees = await sql`
            SELECT * FROM "VoteNominee" ORDER BY "createdAt" DESC
        `;
        return NextResponse.json(nominees);
    } catch (error) {
        console.error('Failed to fetch nominees:', error);
        return NextResponse.json({ error: 'Failed to fetch nominees' }, { status: 500 });
    }
}
