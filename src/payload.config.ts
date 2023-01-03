import { buildConfig } from 'payload/config';
import path from 'path';
import Admins from './collections/Admins';
import Customers from './collections/Customers';
import Products from './collections/Products';
import Orders from './collections/Orders';
import Categories from './collections/Categories';
import stripePlugin from '@payloadcms/plugin-stripe';
import nestedDocs from '@payloadcms/plugin-nested-docs';
import { Header } from './globals/Header';
import { Footer } from './globals/Footer';
import { Pages } from './collections/Pages';
import { Media } from './collections/Media';
import seo from '@payloadcms/plugin-seo';
import { subscriptionCreatedOrUpdated } from './webhooks/subscriptionCreatedOrUpdated';
import { subscriptionDeleted } from './webhooks/subscriptionDeleted';
import { productUpdated } from './webhooks/productUpdated';
import { priceUpdated } from './webhooks/priceUpdated';

export default buildConfig({
  serverURL: 'http://localhost:8000',
  admin: {
    user: Admins.slug,
  },
  collections: [
    Customers,
    Products,
    Categories,
    Orders,
    Pages,
    Media,
    Admins,
  ],
  globals: [
    Header,
    Footer
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
      webhooks: {
        'customer.subscription.created': subscriptionCreatedOrUpdated,
        'customer.subscription.updated': subscriptionCreatedOrUpdated,
        'customer.subscription.deleted': subscriptionDeleted,
        'product.created': productUpdated,
        'product.updated': productUpdated,
        'price.updated': priceUpdated,
      }
    }),
    nestedDocs({
      collections: ['categories']
    }),
    seo({
      collections: [
        'pages',
        'products'
      ],
      uploadsCollection: 'media',
    })
  ]
});
