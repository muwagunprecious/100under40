import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

// During build time (e.g. Vercel deployment), DATABASE_URL may be missing.
// We use a placeholder to allow module evaluation to succeed, throwing only when a query is executed.
const sql = postgres(connectionString || 'postgres://postgres:postgres@localhost:5432/postgres', {
    ssl: connectionString ? 'require' : false,
    max: 10,
    idle_timeout: 20,
    connect_timeout: 30,
});

export default sql;
