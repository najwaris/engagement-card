import type { VercelRequest, VercelResponse } from '@vercel/node';

const GAS_URL = 'https://script.google.com/macros/s/AKfycbyxP6n0O-O26qaMBAsy7fs3x7L8ghLciArnb-JMq85StlK6hWA4pKDkUUfPkpn4uoM4Xw/exec';

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    // Allow browser access
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            const response = await fetch(GAS_URL);
            const data = await response.text();

            return res.status(200).send(data);
        }

        if (req.method === 'POST') {
            const response = await fetch(GAS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req.body),
            });

            const data = await response.text();
            return res.status(200).send(data);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Proxy failed' });
    }
}
