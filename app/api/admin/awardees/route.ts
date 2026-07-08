import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name') as string;
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
        const [awardee] = await sql`
            INSERT INTO "Awardee" (id, name, "categoryId", "photoUrl")
            VALUES (${id}, ${name}, ${categoryId}, ${photoUrl})
            RETURNING *
        `;

        return NextResponse.json(awardee);
    } catch (error) {
        console.error('Failed to create awardee:', error);
        return NextResponse.json({ error: 'Failed to create awardee' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const awardees = await sql`
            SELECT * FROM "Awardee" ORDER BY "createdAt" DESC
        `;
        return NextResponse.json(awardees);
    } catch (error) {
        console.error('Failed to fetch awardees:', error);
        return NextResponse.json({ error: 'Failed to fetch awardees' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const awardees = await sql`
            SELECT "photoUrl" FROM "Awardee" WHERE id = ${id}
        `;
        
        if (awardees.length > 0 && awardees[0].photoUrl) {
            const relativePath = awardees[0].photoUrl;
            const filePath = join(process.cwd(), 'public', relativePath);
            try {
                await unlink(filePath);
            } catch (err) {
                console.error('Failed to delete file', err);
            }
        }

        await sql`
            DELETE FROM "Awardee" WHERE id = ${id}
        `;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete awardee:', error);
        return NextResponse.json({ error: 'Failed to delete awardee' }, { status: 500 });
    }
}
