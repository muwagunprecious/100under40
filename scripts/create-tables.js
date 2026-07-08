require('dotenv').config();
const postgres = require('postgres');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.error('DATABASE_URL is missing.');
    process.exit(1);
}

const sql = postgres(connectionString, { ssl: 'require' });

async function init() {
    try {
        console.log('Creating tables in database...');
        
        await sql`
            CREATE TABLE IF NOT EXISTS "VoteNominee" (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255),
                bio TEXT,
                "categoryId" VARCHAR(255) NOT NULL,
                "photoUrl" VARCHAR(255),
                "votesCount" INTEGER DEFAULT 0 NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
            )
        `;
        console.log('Table "VoteNominee" checked/created.');

        await sql`
            CREATE TABLE IF NOT EXISTS "Awardee" (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                "categoryId" VARCHAR(255) NOT NULL,
                "photoUrl" VARCHAR(255),
                "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
            )
        `;
        console.log('Table "Awardee" checked/created.');
        
        console.log('All tables verified successfully.');
    } catch (err) {
        console.error('Failed to create tables:', err);
    } finally {
        await sql.end();
    }
}

init();
