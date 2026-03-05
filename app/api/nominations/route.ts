import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { nominationSchema } from '@/lib/validations';
import { categories } from '@/lib/mockData';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input
        const validatedData = nominationSchema.parse(body);

        // Check if nominations are open
        const settings = await sql`
            SELECT "isNominationOpen" FROM "Settings" WHERE id = 'global'
        `;

        if (!settings[0]?.isNominationOpen) {
            return NextResponse.json(
                { error: 'Nominations are currently closed.' },
                { status: 403 }
            );
        }

        // Create the nomination
        const [nomination] = await sql`
            INSERT INTO "Nomination" (
                "nomineeName", 
                "nomineeEmail", 
                "nomineePhone", 
                "nomineeAge", 
                "nomineeSocial", 
                "categoryId", 
                "achievements", 
                "supportingDocs", 
                "nominatorName", 
                "nominatorEmail"
            ) VALUES (
                ${validatedData.nomineeName},
                ${validatedData.nomineeEmail},
                ${validatedData.nomineePhone || null},
                ${validatedData.nomineeAge},
                ${validatedData.nomineeSocial},
                ${validatedData.categoryId},
                ${validatedData.achievements},
                ${validatedData.supportingDocs || null},
                ${validatedData.nominatorName},
                ${validatedData.nominatorEmail}
            )
            RETURNING *
        `;

        return NextResponse.json(nomination, { status: 201 });

    } catch (error: any) {
        console.error('Failed to create nomination:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to submit nomination' },
            { status: 400 }
        );
    }
}

export async function GET() {
    try {
        const results = await sql`
            SELECT *
            FROM "Nomination"
            ORDER BY "createdAt" DESC
        `;

        const nominations = results.map((nom: any) => ({
            ...nom,
            categoryName: categories.find((c: any) => c.id === nom.categoryId)?.name || 'General Category'
        }));

        return NextResponse.json(nominations);
    } catch (error: any) {
        console.error('Failed to fetch nominations:', error);
        return NextResponse.json(
            { error: 'Failed to fetch nominations' },
            { status: 500 }
        );
    }
}
