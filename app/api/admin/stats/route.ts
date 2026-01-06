import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const [
            totalNominations,
            pendingNominations,
            approvedNominees,
            totalVotes,
        ] = await Promise.all([
            prisma.nomination.count(),
            prisma.nomination.count({ where: { status: 'pending' } }),
            prisma.nominee.count({ where: { published: true } }),
            prisma.vote.count(),
        ]);

        const recentNominations = await prisma.nomination.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { category: true }
        });

        return NextResponse.json({
            stats: {
                totalNominations,
                pendingNominations,
                approvedNominees,
                totalVotes,
            },
            recentNominations
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
