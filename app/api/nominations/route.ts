import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { nominationSchema } from '@/lib/validations';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input using Zod
        const validation = nominationSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: validation.error.format() },
                { status: 400 }
            );
        }

        const data = validation.data;

        // Check if category exists (basic validation)
        // In a real app, we'd query the DB, but for now assuming categories are static or pre-seeded
        // If you have categories seeds, uncomment below:
        /*
        const category = await prisma.category.findUnique({
          where: { id: data.categoryId }
        });
        if (!category) {
           return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
        }
        */

        // Create nomination
        const nomination = await prisma.nomination.create({
            data: {
                nomineeName: data.nomineeName,
                nomineeEmail: data.nomineeEmail,
                nomineePhone: data.nomineePhone,
                nomineeAge: data.nomineeAge,
                achievements: data.achievements,
                supportingDocs: data.supportingDocs,
                categoryId: data.categoryId, // Ensure this ID exists in DB if Foreign Key constraint is active
                nominatorName: data.nominatorName,
                nominatorEmail: data.nominatorEmail,
                nominatorPhone: data.nominatorPhone,
                status: 'pending',
            },
        });

        return NextResponse.json(
            { message: 'Nomination submitted successfully', id: nomination.id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Nomination error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
