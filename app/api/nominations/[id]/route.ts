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

        // If approved, strictly speaking we should create a Nominee record here
        // or trigger a conversion process. For this MVP we just update status.
        // In full implementation:
        /*
        if (status === 'approved' && !nomination.nomineeId) {
           await prisma.nominee.create({
              data: { ... }
           })
        }
        */

        return NextResponse.json(nomination);
    } catch (error) {
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
