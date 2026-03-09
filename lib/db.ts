import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is missing. Please add it to your environment.');
}

const sql = postgres(connectionString, {
    ssl: 'require',
    max: 10,
    idle_timeout: 20,
    connect_timeout: 30,
});

export default sql;
