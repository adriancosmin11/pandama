const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, unknown>;
}) {
  const endpoint = `https://${domain}/api/2026-01/graphql.json`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const body = await response.json();

  if (body.errors) {
    console.error("GraphQL Errors:", body.errors);
    throw new Error("GraphQL Errors");
  }

  return body;
}

// ─── GraphQL Queries (Storefront API) ─────────────────────────

const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          descriptionHtml
          description
          productType
          tags
          vendor
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 5) {
            edges {
              node {
                id
                title
                sku
                availableForSale
                priceV2 {
                  amount
                  currencyCode
                }
                compareAtPriceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CREATE_CHECKOUT_MUTATION = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

// ─── Helper Functions ─────────────────────────────────────────

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  description: string;
  productType: string;
  tags: string[];
  vendor: string;
  images: { url: string; altText: string | null }[];
  variants: {
    id: string;
    title: string;
    sku: string;
    availableForSale: boolean;
    price: number;
    currencyCode: string;
    compareAtPrice: number | null;
  }[];
}

function mapShopifyProduct(node: any): ShopifyProduct {
  return {
    id: node.id,
    title: node.title,
    handle: node.handle,
    descriptionHtml: node.descriptionHtml,
    description: node.description,
    productType: node.productType,
    tags: node.tags,
    vendor: node.vendor,
    images: node.images.edges.map((e: any) => ({
      url: e.node.url,
      altText: e.node.altText,
    })),
    variants: node.variants.edges.map((e: any) => ({
      id: e.node.id,
      title: e.node.title,
      sku: e.node.sku,
      availableForSale: e.node.availableForSale,
      price: parseFloat(e.node.priceV2.amount),
      currencyCode: e.node.priceV2.currencyCode,
      compareAtPrice: e.node.compareAtPriceV2
        ? parseFloat(e.node.compareAtPriceV2.amount)
        : null,
    })),
  };
}

export async function getProducts(count = 20): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch({
    query: GET_PRODUCTS_QUERY,
    variables: { first: count },
  });
  return data.data.products.edges.map((edge: any) =>
    mapShopifyProduct(edge.node)
  );
}

export interface CheckoutLineItem {
  variantId: string;
  quantity: number;
}

export async function createCheckout(
  lineItems: CheckoutLineItem[]
): Promise<string> {
  const data = await shopifyFetch({
    query: CREATE_CHECKOUT_MUTATION,
    variables: {
      input: { lineItems },
    },
  });

  const { checkout, checkoutUserErrors } = data.data.checkoutCreate;

  if (checkoutUserErrors && checkoutUserErrors.length > 0) {
    console.error("Checkout Errors:", checkoutUserErrors);
    throw new Error(checkoutUserErrors[0].message);
  }

  return checkout.webUrl;
}

/**
 * Returns true if the Storefront API credentials are configured.
 */
export function isShopifyConfigured(): boolean {
  return Boolean(domain && storefrontAccessToken);
}
