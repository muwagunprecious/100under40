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
    { id: '5', name: 'Content & Creative' },
    { id: '6', name: 'Media & Communications' },
    { id: '7', name: 'Healthcare & Wellness' },
    { id: '8', name: 'Education & Human Capital Development' },
    { id: '9', name: 'Agriculture & Food Systems' },
    { id: '10', name: 'Social Innovation, Philanthropy & Development' },
    { id: '11', name: 'Art & Culture' },
    { id: '12', name: 'Fashion & Beauty' },
    { id: '13', name: 'Entertainment & Literature' }
];

const categoryMap = {};
categories.forEach(c => { categoryMap[c.id] = c.name; });

async function removeDuplicatesAndExport() {
    try {
        const nominations = await sql`SELECT * FROM "Nomination" ORDER BY "createdAt" ASC`;
        
        const seenNames = new Set();
        const duplicates = [];
        const uniqueNominations = [];
        
        for (const nom of nominations) {
            const name = (nom.nomineeName || '').trim().toLowerCase();
            if (seenNames.has(name)) {
                duplicates.push(nom.id);
            } else {
                seenNames.add(name);
                uniqueNominations.push(nom);
            }
        }
        
        console.log(`Found ${duplicates.length} duplicate nominations based on nominee name.`);
        
        if (duplicates.length > 0) {
            const result = await sql`DELETE FROM "Nomination" WHERE id IN ${sql(duplicates)}`;
            console.log(`Deleted ${result.count} duplicate records.`);
        } else {
            console.log('No duplicates to delete.');
        }

        console.log('Exporting updated nominations to nominees.csv...');
        const header = ['Name', 'Email', 'Phone', 'Age', 'Category', 'Achievements', 'Nominator Name', 'Nominator Email', 'Status', 'Date'].join(',');
        
        const rows = uniqueNominations.map(nom => {
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
        console.log(`Successfully saved ${uniqueNominations.length} unique records to nominees.csv`);
        
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await sql.end();
    }
}
removeDuplicatesAndExport();
