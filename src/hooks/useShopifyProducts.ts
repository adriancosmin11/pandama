import { useState, useEffect } from 'react';
import { getProducts, isShopifyConfigured, type ShopifyProduct } from '../lib/shopify';
import { PRODUCTS, type Product } from '../constants';

/**
 * Maps a Shopify product to the existing Product interface used across the app.
 */
function shopifyToProduct(sp: ShopifyProduct): Product {
    const variant = sp.variants[0];
    const image = sp.images[0]?.url || '';

    // Map Shopify productType to our category enum, fallback to 'Standard'
    let category: Product['category'] = 'Standard';
    const type = sp.productType.toLowerCase();
    if (type.includes('legendary')) category = 'Legendary';
    else if (type.includes('rare')) category = 'Rare';
    else if (type.includes('limited')) category = 'Limited';

    return {
        id: sp.id,
        name: sp.title,
        price: variant?.price ?? 0,
        originalPrice: variant?.compareAtPrice ?? undefined,
        description: sp.description,
        image,
        category,
        sku: variant?.sku ?? '',
        specs: sp.tags.length > 0 ? sp.tags : [],
        variantId: variant?.id ?? '',
        availableForSale: variant?.availableForSale ?? false,
    };
}

interface UseShopifyProductsResult {
    products: Product[];
    loading: boolean;
    error: string | null;
}

export function useShopifyProducts(): UseShopifyProductsResult {
    const [products, setProducts] = useState<Product[]>(PRODUCTS);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isShopifyConfigured()) {
            // No Storefront credentials → use hardcoded fallback
            setLoading(false);
            return;
        }

        let cancelled = false;

        async function fetchProducts() {
            try {
                const shopifyProducts = await getProducts(20);
                if (!cancelled) {
                    if (shopifyProducts.length > 0) {
                        setProducts(shopifyProducts.map(shopifyToProduct));
                    }
                    // If Shopify returns 0 products, keep the hardcoded fallback
                }
            } catch (err) {
                if (!cancelled) {
                    console.error('Failed to fetch Shopify products, using fallback:', err);
                    setError('Failed to load products from store');
                    // Keep hardcoded products as fallback
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchProducts();
        return () => { cancelled = true; };
    }, []);

    return { products, loading, error };
}
