const fetch = require('node-fetch');

async function testOG() {
    try {
        const url = 'http://localhost:3003/api/og?title=Test%20Title&desc=Test%20Description';
        console.log(`Fetching ${url}...`);
        const res = await fetch(url);
        console.log(`Status: ${res.status}`);
        console.log(`Content-Type: ${res.headers.get('content-type')}`);

        if (res.status === 200 && res.headers.get('content-type')?.includes('image/png')) {
            console.log('✅ OG Image API is working correctly!');
        } else {
            console.log('❌ Failed to generate image.');
        }
    } catch (e) {
        console.log('Checking fallback port 3000...');
        try {
            const url = 'http://localhost:3000/api/og?title=Test%20Title&desc=Test%20Description';
            console.log(`Fetching ${url}...`);
            const res = await fetch(url);
            console.log(`Status: ${res.status}`);
            console.log(`Content-Type: ${res.headers.get('content-type')}`);

            if (res.status === 200 && res.headers.get('content-type')?.includes('image/png')) {
                console.log('✅ OG Image API is working correctly!');
            } else {
                console.log('❌ Failed to generate image.');
            }
        } catch (e2) {
            console.error('❌ Could not connect to dev server. Is it running?');
        }
    }
}

testOG();
