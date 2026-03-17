import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { communitySchema } from '@/lib/validations';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input
        const validatedData = communitySchema.parse(body);

        // Create the application
        const [application] = await sql`
            INSERT INTO "CommunityApplication" (
                "fullName", 
                "email", 
                "state", 
                "productUnit", 
                "serviceUnit", 
                "callLine", 
                "whatsAppNumber"
            ) VALUES (
                ${validatedData.fullName},
                ${validatedData.email},
                ${validatedData.state},
                ${validatedData.productUnit || null},
                ${validatedData.serviceUnit || null},
                ${validatedData.callLine},
                ${validatedData.whatsAppNumber}
            )
            RETURNING *
        `;

        return NextResponse.json(application, { status: 201 });

    } catch (error: any) {
        console.error('Failed to create community application:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to submit application' },
            { status: 400 }
        );
    }
}

export async function GET() {
    try {
        const applications = await sql`
            SELECT *
            FROM "CommunityApplication"
            ORDER BY "createdAt" DESC
        `;

        return NextResponse.json(applications);
    } catch (error: any) {
        console.error('Failed to fetch community applications:', error);
        return NextResponse.json(
            { error: 'Failed to fetch community applications' },
            { status: 500 }
        );
    }
}
