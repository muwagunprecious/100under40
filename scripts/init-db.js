const postgres = require('postgres');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.error('DATABASE_URL is not defined in .env');
    process.exit(1);
}

const sql = postgres(connectionString, { ssl: 'require' });

async function initDb() {
    try {
        console.log('Creating tables...');

        await sql`
            CREATE TABLE IF NOT EXISTS "Nomination" (
                "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                "nomineeName" TEXT NOT NULL,
                "nomineeEmail" TEXT NOT NULL,
                "nomineePhone" TEXT,
                "nomineeAge" INTEGER NOT NULL,
                "categoryId" TEXT NOT NULL,
                "achievements" TEXT NOT NULL,
                "supportingDocs" TEXT,
                "nominatorName" TEXT NOT NULL,
                "nominatorEmail" TEXT NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS "Settings" (
                "id" TEXT PRIMARY KEY DEFAULT 'global',
                "isNominationOpen" BOOLEAN DEFAULT false,
                "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await sql`
            CREATE TABLE IF NOT EXISTS "Newsletter" (
                "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                "email" TEXT UNIQUE NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;

        // Ensure default settings exist
        const settingsCount = await sql`SELECT count(*) FROM "Settings" WHERE id = 'global'`;
        if (settingsCount[0].count === '0') {
            await sql`INSERT INTO "Settings" (id, "isNominationOpen") VALUES ('global', false)`;
            console.log('Inserted default settings.');
        }

        console.log('Database initialized successfully.');
    } catch (error) {
        console.error('Failed to initialize database:', error);
    } finally {
        await sql.end();
    }
}

initDb();
