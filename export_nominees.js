require('dotenv').config();
const postgres = require('postgres');
const fs = require('fs');

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString, {
    ssl: 'require',
    max: 10,
    idle_timeout: 20,
    connect_timeout: 30,
});

const categories = [
    { id: '1', name: 'Business & Entrepreneurship' },
    { id: '2', name: 'Technology & Innovation' },
    { id: '3', name: 'Governance, Policy & Public Service' },
    { id: '4', name: 'Finance & Investment' },
    { id: '5', name: 'Creative & Cultural Industries' },
    { id: '6', name: 'Media & Communications' },
    { id: '7', name: 'Healthcare & Wellness' },
    { id: '8', name: 'Education & Human Capital Development' },
    { id: '9', name: 'Agriculture & Food Systems' },
    { id: '10', name: 'Social Innovation, Philanthropy & Development' },
    { id: '11', name: 'Art & Entertainment' }
];

const categoryMap = {};
categories.forEach(c => { categoryMap[c.id] = c.name; });

async function exportData() {
    try {
        const nominations = await sql`SELECT * FROM "Nomination"`;
        console.log('Fetched ' + nominations.length + ' nominations');
        
        const header = ['Name', 'Email', 'Phone', 'Age', 'Category', 'Achievements', 'Nominator Name', 'Nominator Email', 'Status', 'Date'].join(',');
        
        const rows = nominations.map(nom => {
            const catName = categoryMap[nom.categoryId] || nom.categoryId;
            const achievements = (nom.achievements || '').replace(/"/g, '""').replace(/\n/g, ' ');
            return [
                `"${nom.nomineeName || ''}"`,
                `"${nom.nomineeEmail || ''}"`,
                `"${nom.nomineePhone || ''}"`,
                nom.nomineeAge,
                `"${catName}"`,
                `"${achievements}"`,
                `"${nom.nominatorName || ''}"`,
                `"${nom.nominatorEmail || ''}"`,
                `"${nom.status || ''}"`,
                `"${nom.createdAt ? new Date(nom.createdAt).toISOString() : ''}"`
            ].join(',');
        });
        
        fs.writeFileSync('nominees.csv', header + '\n' + rows.join('\n'));
        console.log('Saved to nominees.csv');
    } catch (e) {
        console.error(e);
    } finally {
        await sql.end();
    }
}
exportData();
