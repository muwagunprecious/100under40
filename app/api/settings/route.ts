import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
    try {
        const settings = await sql`
            SELECT "isNominationOpen" FROM "Settings" WHERE id = 'global'
        `;

        if (settings.length === 0) {
            // Initialize defaults if not present
            const [newSettings] = await sql`
                INSERT INTO "Settings" (id, "isNominationOpen") 
                VALUES ('global', false)
                RETURNING "isNominationOpen"
            `;
            return NextResponse.json(newSettings);
        }

        return NextResponse.json(settings[0]);
    } catch (error) {
        console.error('Failed to fetch settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { isNominationOpen } = body;

        const [settings] = await sql`
            INSERT INTO "Settings" (id, "isNominationOpen")
            VALUES ('global', ${isNominationOpen})
            ON CONFLICT (id) DO UPDATE 
            SET "isNominationOpen" = EXCLUDED."isNominationOpen",
                "updatedAt" = CURRENT_TIMESTAMP
            RETURNING "isNominationOpen"
        `;

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Failed to update settings:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
