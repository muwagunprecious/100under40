const postgres = require('postgres');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.error('DATABASE_URL is not defined in .env');
    process.exit(1);
}

const sql = postgres(connectionString, { ssl: 'require' });

async function test() {
    try {
        console.log('Testing connection...');
        const result = await sql`SELECT 1 as connected`;
        console.log('Connection successful:', result);

        console.log('Checking for Newsletter table...');
        const tableCheck = await sql`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'Newsletter'
            );
        `;
        console.log('Newsletter table exists:', tableCheck[0].exists);

        if (tableCheck[0].exists) {
            const columns = await sql`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = 'Newsletter';
            `;
            console.log('Newsletter columns:', columns);
        }

    } catch (error) {
        console.error('Database test failed:', error);
    } finally {
        await sql.end();
    }
}

test();
