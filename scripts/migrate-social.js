const postgres = require('postgres');

const connectionString = "postgresql://postgres.berokzsichlvmaqtwihz:zvA8UqOxN2E0p5bc@aws-1-eu-west-1.pooler.supabase.com:5432/postgres";

const sql = postgres(connectionString, { ssl: 'require' });

async function migrate() {
    try {
        console.log('Adding nomineeSocial column to Nomination table...');
        await sql`
            ALTER TABLE "Nomination" 
            ADD COLUMN IF NOT EXISTS "nomineeSocial" TEXT;
        `;
        console.log('Migration successful!');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
