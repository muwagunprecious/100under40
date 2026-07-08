import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string || null;
        const bio = formData.get('bio') as string || null;
        const categoryId = formData.get('categoryId') as string;
        const file = formData.get('photo') as File | null;

        if (!name || !categoryId) {
            return NextResponse.json({ error: 'Name and Category are required' }, { status: 400 });
        }

        let photoUrl = '';
        if (file && file.size > 0) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            const uploadDir = join(process.cwd(), 'public', 'uploads');
            try {
                await mkdir(uploadDir, { recursive: true });
            } catch (err) {}

            const ext = file.name.split('.').pop() || 'jpg';
            const fileName = `${randomUUID()}.${ext}`;
            const filePath = join(uploadDir, fileName);
            await writeFile(filePath, buffer);
            photoUrl = `/uploads/${fileName}`;
        }

        const id = randomUUID();
        const [nominee] = await sql`
            INSERT INTO "VoteNominee" (id, name, email, bio, "categoryId", "photoUrl", "votesCount")
            VALUES (${id}, ${name}, ${email}, ${bio}, ${categoryId}, ${photoUrl}, 0)
            RETURNING *
        `;

        return NextResponse.json(nominee);
    } catch (error) {
        console.error('Failed to create nominee:', error);
        return NextResponse.json({ error: 'Failed to create nominee' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const nominees = await sql`
            SELECT * FROM "VoteNominee" ORDER BY "createdAt" DESC
        `;
        return NextResponse.json(nominees);
    } catch (error) {
        console.error('Failed to fetch nominees:', error);
        return NextResponse.json({ error: 'Failed to fetch nominees' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const nominees = await sql`
            SELECT "photoUrl" FROM "VoteNominee" WHERE id = ${id}
        `;
        
        if (nominees.length > 0 && nominees[0].photoUrl) {
            const relativePath = nominees[0].photoUrl;
            const filePath = join(process.cwd(), 'public', relativePath);
            try {
                await unlink(filePath);
            } catch (err) {
                console.error('Failed to delete file', err);
            }
        }

        await sql`
            DELETE FROM "VoteNominee" WHERE id = ${id}
        `;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete nominee:', error);
        return NextResponse.json({ error: 'Failed to delete nominee' }, { status: 500 });
    }
}
