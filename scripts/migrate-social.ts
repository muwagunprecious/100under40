import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;
const sql = postgres(connectionString, { ssl: 'require' });

async function migrate() {
    try {
        console.log('Adding nomineeSocial column to Nomination table...');
        await sql`
            ALTER TABLE "Nomination" 
            ADD COLUMN IF NOT EXISTS "nomineeSocial" TEXT;
        `;

        // Make it NOT NULL after adding it if you want, but might need a default for existing records
        // For now, let's just make it existing.

        console.log('Migration successful!');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
