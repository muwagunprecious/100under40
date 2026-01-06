import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const [nominees, categories] = await Promise.all([
            prisma.nominee.findMany({
                where: { published: true },
                include: { category: true }
            }),
            prisma.category.findMany()
        ]);

        return NextResponse.json({
            nominees,
            categories
        });
    } catch (error) {
        console.error('Fetch nominees error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
