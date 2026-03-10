import express from 'express';
import dotenv from 'dotenv';
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, ApiVersion, LATEST_API_VERSION } from '@shopify/shopify-api';

dotenv.config();

const PORT = 3001;

// Ensure credentials are provided
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecretKey = process.env.SHOPIFY_API_SECRET;
const storeDomain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
const hostName = `localhost:${PORT}`;

if (!apiKey || !apiSecretKey || !storeDomain) {
    console.error("Missing required environment variables in .env:");
    console.error("- SHOPIFY_API_KEY");
    console.error("- SHOPIFY_API_SECRET");
    console.error("- VITE_SHOPIFY_STORE_DOMAIN");
    process.exit(1);
}

const shopify = shopifyApi({
    apiKey,
    apiSecretKey,
    scopes: ['read_products', 'write_products'],
    hostName,
    hostScheme: 'http',
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: false, // We just want the token
});

const app = express();

app.get('/login', async (req, res) => {
    try {
        // Begin the OAuth process
        await shopify.auth.begin({
            shop: shopify.utils.sanitizeShop(storeDomain as string, true) as string,
            callbackPath: '/auth/callback',
            isOnline: false, // Request an offline token (permanent)
            rawRequest: req,
            rawResponse: res,
        });
    } catch (error) {
        console.error('Failed to begin auth', error);
        res.status(500).send('Failed to begin auth');
    }
});

app.get('/auth/callback', async (req, res) => {
    try {
        const callbackResponse = await shopify.auth.callback({
            rawRequest: req,
            rawResponse: res,
        });

        const { session } = callbackResponse;
        const accessToken = session.accessToken;

        console.log('\n\n======================================');
        console.log('SUCCESS! Add this to your .env file:');
        console.log(`SHOPIFY_ADMIN_ACCESS_TOKEN="${accessToken}"`);
        console.log('======================================\n\n');

        res.send(`
      <div style="font-family: sans-serif; padding: 40px; text-align: center;">
        <h1 style="color: #4CAF50;">Success!</h1>
        <p>Your Admin API Token has been generated.</p>
        <div style="background: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px auto; max-width: 600px; word-break: break-all;">
          <strong>SHOPIFY_ADMIN_ACCESS_TOKEN="${accessToken}"</strong>
        </div>
        <p>Copy this value into your .env file, then check your terminal to kill this server (Ctrl+C). You can close this window.</p>
      </div>
    `);
    } catch (error) {
        console.error('Failed to complete auth', error);
        res.status(500).send('Failed to complete auth');
    }
});

app.listen(PORT, () => {
    console.log(`\n\nOAuth server running!`);
    console.log(`Open this URL in your browser to get your Admin Access Token:`);
    console.log(`http://localhost:${PORT}/login\n\n`);
});
