import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
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
import { GenerateTitle } from '@payloadcms/plugin-seo/types';
import { productUpdated } from './stripe/webhooks/productUpdated';
import { priceUpdated } from './stripe/webhooks/priceUpdated';
import { CartPage } from './globals/CartPage';
import { Settings } from './globals/Settings';
import { invoiceCreatedOrUpdated } from './stripe/webhooks/invoiceCreatedOrUpdated';
import { checkout } from './routes/checkout';

const generateTitle: GenerateTitle = () => {
  return 'My Store'
}

const mockModulePath = path.resolve(__dirname, './emptyModuleMock.js')

export default buildConfig({
  serverURL: 'http://localhost:8000',
  admin: {
    user: Users.slug,
    webpack: config => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          [path.resolve(__dirname, 'collections/Products/hooks/beforeChange.ts')]: mockModulePath,
          [path.resolve(__dirname, 'routes/checkout.ts')]: mockModulePath,
          stripe: mockModulePath,
          express: mockModulePath,
        },
      },
    }),
  },
  collections: [
    Users,
    Products,
    Categories,
    Orders,
    Pages,
    Media,
  ],
  globals: [
    Settings,
    Header,
    Footer,
    CartPage
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: [
    process.env.PAYLOAD_PUBLIC_APP_URL || '',
    'https://checkout.stripe.com'
  ].filter(Boolean),
  csrf: [
    process.env.PAYLOAD_PUBLIC_APP_URL || ''
  ].filter(Boolean),
  endpoints: [
    {
      path: '/checkout',
      method: 'post',
      handler: checkout
    }
  ],
  plugins: [
    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
      webhooks: {
        'invoice.created': invoiceCreatedOrUpdated,
        'invoice.updated': invoiceCreatedOrUpdated,
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
      generateTitle,
      uploadsCollection: 'media',
    })
  ]
});
