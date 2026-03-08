async function testApi() {
    try {
        console.log('Sending request to http://127.0.0.1:3000/api/newsletter...');
        const response = await fetch('http://127.0.0.1:3000/api/newsletter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: `test-${Date.now()}@example.com` }),
        });

        const data = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Fetch failed:', error.message);
    }
}

testApi();
