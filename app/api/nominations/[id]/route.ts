import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body; // 'approved' or 'rejected'

        if (!['approved', 'rejected', 'pending'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const nomination = await prisma.nomination.update({
            where: { id },
            data: { status },
        });

        if (status === 'approved') {
            // Check if nominee already exists
            const existingNominee = await prisma.nominee.findFirst({
                where: {
                    name: nomination.nomineeName,
                    categoryId: nomination.categoryId
                }
            });

            if (!existingNominee) {
                await prisma.nominee.create({
                    data: {
                        name: nomination.nomineeName,
                        categoryId: nomination.categoryId,
                        bio: nomination.achievements,
                        published: true
                    }
                });
            }
        }

        return NextResponse.json(nomination);
    } catch (error) {
        console.error('Update nomination error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const nomination = await prisma.nomination.findUnique({
            where: { id }
        });

        if (!nomination) {
            return NextResponse.json({ error: 'Nomination not found' }, { status: 404 });
        }

        return NextResponse.json(nomination);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
