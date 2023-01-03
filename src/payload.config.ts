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

export default buildConfig({
  serverURL: 'http://localhost:3000',
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
