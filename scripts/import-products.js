import { createAdminApiClient } from '@shopify/admin-api-client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const client = createAdminApiClient({
  storeDomain: process.env.VITE_SHOPIFY_STORE_DOMAIN,
  apiVersion: '2024-01',
  accessToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
});

const products = [
  {
    title: 'VOID SHIFTER',
    body_html: 'Seria emblematică cu finisaj carbon mat și corzi din mătase violetă.',
    vendor: 'PANDAMA',
    product_type: 'Legendary',
    status: 'active',
    variants: [
      {
        price: '124.00',
        compare_at_price: '159.00',
        sku: 'PN-VDS-04',
        inventory_management: 'shopify',
      }
    ]
  },
  {
    title: 'NEON KATANA',
    body_html: 'Ediție limitată cu design cyberpunk și strălucire reactivă.',
    vendor: 'PANDAMA',
    product_type: 'Rare',
    status: 'active',
    variants: [
      {
        price: '89.00',
        sku: 'PN-NKT-02',
        inventory_management: 'shopify',
      }
    ]
  },
  {
    title: 'CHROME BAMBOO',
    body_html: 'Sculptură minimalistă din lemn fuzionată cu performanță modernă.',
    vendor: 'PANDAMA',
    product_type: 'Standard',
    status: 'active',
    variants: [
      {
        price: '75.00',
        sku: 'PN-CBM-01',
        inventory_management: 'shopify',
      }
    ]
  },
  {
    title: 'SPIRIT BLADE',
    body_html: 'Serie ultraușoară pentru joc rapid și dinamic.',
    vendor: 'PANDAMA',
    product_type: 'Limited',
    status: 'active',
    variants: [
      {
        price: '95.00',
        sku: 'PN-SBT-03',
        inventory_management: 'shopify',
      }
    ]
  },
  {
    title: 'GHOST PROTOCOL',
    body_html: 'Seria stealth cu finisaj negru mat și rulment silențios.',
    vendor: 'PANDAMA',
    product_type: 'Legendary',
    status: 'active',
    variants: [
      {
        price: '145.00',
        compare_at_price: '189.00',
        sku: 'PN-GHP-05',
        inventory_management: 'shopify',
      }
    ],
    // This one has a public URL image
    images: [{ src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB5A_3qQjckCcr8r5B3VYC_bHTv5zxfILtcTvqyMlU6cUoEaefG-iyKd_4juMQDObgGoU80XqGEUwZtFoqWe17m8HncnJVUr082sKcsyeq2A9MVtFXxKiMqymr_y2lQoYm7p7jhASb6YHHnOOxVOVvBV-umDbRq9mZkNaIPNknC6lyRcaQsdSaPs6ba4WtLtdyN_Z4Rgm8xzQATfvx8_H5uLhPV9LZiPcDVk-NUWyQY57-rTA-4dkpudqPyFrHTJ5HyuJMUH30HJIc' }]
  },
  {
    title: 'SAKURA DRIFT',
    body_html: 'Serie limitată flori de cireș. Motive japoneze pictate manual pe arțar premium.',
    vendor: 'PANDAMA',
    product_type: 'Limited',
    status: 'active',
    variants: [
      {
        price: '110.00',
        sku: 'PN-SKD-06',
        inventory_management: 'shopify',
      }
    ],
    images: [{ src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0U_GH6YVeYjZXJ1D7JLIjeutwAeRo0mJIvmdtY5n2Dq628THmxiWoHRPlIot_1Ky3bCDboFbkI52IFeVPCWHlUVr8kvNUswQ9rdTMYCl02EE_IPO_cuiLQUAwMoD5yE-FqA06KuXyeK_IIS0KNLpeVlSve8F8DfA1QxaN35G0UeunN37RYs0IxaYsEWNSjlrIav64oZ_jjJ4gSsGmV3MUSjDNeZicJ8tqzz9CkhgnOxgEdcCcxQP5penWJoTNeFUty2qwbeCliTB8' }]
  },
  {
    title: 'TITANIUM APEX',
    body_html: 'Nivel competiție cu carcasă din titan aerospațial. Creat pentru câștigători.',
    vendor: 'PANDAMA',
    product_type: 'Legendary',
    status: 'active',
    variants: [
      {
        price: '199.00',
        compare_at_price: '249.00',
        sku: 'PN-TXA-07',
        inventory_management: 'shopify',
      }
    ],
    images: [{ src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyYib6r47gUtIWuY4yJNcss-oG_VdVLAnnRsJvlGqezQhfsbkoR2BOfswBbM_Q5XMztmjLB8rbbiNKpT3SzRHnRUyZHgTm1UVJtV0mYchHTUv3kGu2ZjjbAeJmLfWmJeAlSvzDpbzMX4ITUUAXLbUqxkXRap9-KiXHu7LLhPbOxumb3OV3JAJZDdd0qYSZj9Rrh0VKY6Qt_ksU87ec3dPBSJRy-_mtPnrzfIHxty01BWU8YRQ_dM7jbeZZIQVQzF3HO8FumyXC1D4z' }]
  },
  {
    title: 'PIXEL STORM',
    body_html: 'Artă pixel retro întâlnește inginerie modernă. Finisaj camuflaj digital.',
    vendor: 'PANDAMA',
    product_type: 'Standard',
    status: 'active',
    variants: [
      {
        price: '68.00',
        sku: 'PN-PXS-08',
        inventory_management: 'shopify',
      }
    ]
  }
];

const CREATE_PRODUCT_MUTATION = `
  mutation productCreate($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
        title
      }
      userErrors {
        field
        message
      }
    }
  }
`;

async function importProducts() {
  console.log("Starting product import...");

  for (const product of products) {
    try {
      console.log(`Creating ${product.title}...`);
      
      const { data, errors } = await client.request(CREATE_PRODUCT_MUTATION, {
        variables: {
          input: {
            title: product.title,
            descriptionHtml: product.body_html,
            vendor: product.vendor,
            productType: product.product_type,
            status: 'ACTIVE',
            variants: product.variants.map(v => ({
              price: v.price,
              compareAtPrice: v.compare_at_price || null,
              sku: v.sku,
              inventoryManagement: "SHOPIFY"
            })),
            // Map simple image URLs for the ones we have
            ...(product.images ? { images: product.images.map(img => ({ src: img.src })) } : {})
          }
        }
      });

      if (errors && errors.graphQLErrors && errors.graphQLErrors.length > 0) {
        console.error(`FAILED to create ${product.title}:`, errors.graphQLErrors);
      } else if (data.productCreate.userErrors.length > 0) {
        console.error(`FAILED to create ${product.title}:`, data.productCreate.userErrors);
      } else {
        console.log(`✅ Successfully created ${product.title}! ID: ${data.productCreate.product.id}`);
      }

    } catch (error) {
       console.error(`Error on ${product.title}:`, error);
    }
  }
  
  console.log("\nFinished importing products!");
  console.log("Note: Some products use local images. You might need to manually attach best-sellers[1-4].png in the Shopify Admin panel.");
}

importProducts();
