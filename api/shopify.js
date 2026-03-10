export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
    const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

    if (!domain || !token) {
        return res.status(500).json({ error: 'Shopify not configured' });
    }

    try {
        const { query, variables } = req.body;

        const response = await fetch(
            `https://${domain}/admin/api/2026-01/graphql.json`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': token,
                },
                body: JSON.stringify({ query, variables }),
            }
        );

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Shopify proxy error:', error);
        return res.status(500).json({ error: 'Failed to fetch from Shopify' });
    }
}
