import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { categories } from '@/lib/mockData';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const [nominationData] = await sql`
            SELECT *
            FROM "Nomination"
            WHERE id = ${id}
        `;

        if (!nominationData) {
            return NextResponse.json(
                { error: 'Nomination not found' },
                { status: 404 }
            );
        }

        const nomination = {
            ...nominationData,
            categoryName: categories.find((c: any) => c.id === nominationData.categoryId)?.name || 'General Category'
        };

        return NextResponse.json(nomination);
    } catch (error: any) {
        console.error('Failed to fetch nomination:', error);
        return NextResponse.json(
            { error: 'Failed to fetch nomination' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { status } = await request.json();

        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return NextResponse.json(
                { error: 'Invalid status' },
                { status: 400 }
            );
        }

        const [updatedNomination] = await sql`
            UPDATE "Nomination"
            SET "status" = ${status}
            WHERE id = ${id}
            RETURNING *
        `;

        if (!updatedNomination) {
            return NextResponse.json(
                { error: 'Nomination not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedNomination);
    } catch (error: any) {
        console.error('Failed to update nomination:', error);
        return NextResponse.json(
            { error: 'Failed to update nomination' },
            { status: 500 }
        );
    }
}
