# Payload E-Commerce Boilerplate

A boilerplate for [Payload CMS](https://github.com/payloadcms/payload) to power e-commerce businesses that sell one-time products or services. There is a complete front-end website for this boilerplate which can be found [here](https://github.com/payloadcms/ecommerce-example-website).

Core features:

- [Pre-configured Payload config](#config)
- [Customer authentication](#users)
- [Role-based access control](#role-based-access-control)
- [Shopping cart](#shopping-cart)
- [Checkout](#checkout)
- [Paywall](#paywall)
- [Layout builder](#layout-builder)
- [SEO](#seo)

## Config

The Payload config is tailored to the needs of an e-commerce business. It is pre-configured in the following way:

### Collections

- #### Users

  Users encompass both admins and customers based on the value of their `roles` field. Only admins can access your admin panel to manage your store. Customers can authenticate on your front-end to create [shopping carts](#shopping-cart) and place [orders](#rders), but have limited access to the system. See [role based access control](#role-based-access-control) for more details.

- #### Products

  Each product is linked to Stripe via a select field that is dynamically populated in the products sidebar. This field fetches all available products in the background and displays them as options. Once a product has been selected, prices get automatically synced between Stripe and Payload. All products are page-builder enabled, so you can generate unique pages for each product using layout-building blocks. They can also [paywall their content](#paywall).

- #### Orders

  A static copy of customer and product data at the time of the order, because customers and products are subject to change over time.

- #### Pages

  An arbitrary page of dynamic content using layout building blocks, i.e. home page.

- #### Media

  An uploads-enabled collection used by products and pages.

- #### Categories

  A taxonomy used to group products together. Categories can be nested inside of one another, for example "Shirts > Red". See [Payload Nested Docs Plugin](https://github.com/payloadcms/plugin-nested-docs) for more details.

### Globals

- `Header`

  The data required by the header on your front-end, i.e. an array of nav links.

- `Footer`

  Same as above but for the footer.

## Access control

Basic role-based access control is setup using to determine what users can and cannot do based on their roles, which are:

- `admin`: They can access the Payload admin panel to manage your store. They can see all data and make all operations.
- `customer`: They cannot access the Payload admin panel and have a limited access based on their user (see below).

This applies to each collection in the following ways:

- `users`: Only admins and the user themselves can access their profile. Anyone can create a user but only admins can delete users.
- `orders`: Only admins and the user who placed the order can access it. Once placed, orders cannot be edited or deleted.
- `products`: Everyone can access products, but only admins can create, update, or delete them. Products with a [paywall](#paywall) may also have content that is only accessible by customers who have purchased the product.

See [Payload Access Control](https://payloadcms.com/docs/access-control/overview#access-control) for more details on how to extend this functionality.

## Shopping cart

Logged-in users can have their shopping carts saved to their profiles as they shop. This way they can continue shopping at a later date or on another device. When not logged in, the cart can be saved to local storage and synced to Payload upon logging in. A complete front-end solution for this can be found [here](https://github.com/payloadcms/ecommerce-example-website). It works by maintaining a `cart` field on the `user`:

```ts
{
  name: 'cart',
  label: 'Shopping Cart',
  type: 'object',
  fields: [
    {
      name: 'items',
      label: 'Items',
      type: 'array',
      fields: [
        // product, quantity, etc
      ]
    },
    // other metadata like `createdOn`, etc
  ]
}
```

## Stripe integration

Payload itself handles no currency exchange. All payments are processed and billed using [Stripe](https://stripe.com). This means you must have your Stripe account via an API key (see the [Stripe](#stripe) section for how to do this). When you create a product in Payload, you must link it to a Stripe product using the pre-populated select field in the products sidebar. This field fetches all available products in the background and displays them for you to select. Once set, prices are automatically synced between Stripe and Payload. This means that if you change the price of a product in Stripe, it will automatically update in Payload. This is done by using the [Stripe Webhook](https://stripe.com/docs/webhooks) to listen for price updates and update the product in Payload, powered by the official [Payload Stripe Plugin](https://github.com/payloadcms/plugin-stripe).

After completing checkout on your front-end, Stripe fires a webhook that Payload picks up and uses to generate a record of the order.

## Checkout

A custom endpoint is open at `/api/checkout` which initiates the checkout process. This endpoint creates a `PaymentIntent` with the items in the cart using the Stripe's Invoices API. An invoice is first drafted, then each item of your cart is appended as a line-item of that invoice, associated with its relative `stripeID`. We also lookup the original product price in Stripe and recalculate the total price of the invoice on the server for accuracy and security. Once completed, we pass the `client_secret` of the payment intent back to the client which can continue to process the payment.

## Paywall

Products can optionally gate content or assets behind a paywall. This will require the product to be purchased before it's resources are accessible. To do this, we add a `paywall` field to the `product` collection with `read` access control to check for associated purchases on each request. The purchases field is maintained each time an order is placed with a reference to the product. With this pattern you can adjust access through the paywall without adjusting orders themselves.

```ts
{
  name: 'paywall',
  label: 'Paywall',
  type: 'blocks',
  access: {
    read: checkUserPurchases,
  },
  fields: [
    // assets
  ]
}
```

## Layout builder

Products and pages can be built using a layout builder. This allows you to create unique layouts for each product or page. A complete front-end solution for this can be found [here](https://github.com/payloadcms/ecommerce-example-website). This boilerplate comes pre-configured with the following layout building blocks:

- Hero
- Content
- Media
- Call To Action
- Archive

## SEO

This boilerplate comes pre-configured with the official [Payload SEO Plugin](http://payloadcms.com/) to manage product and page SEO data. A complete front-end solution for this can be found [here](https://github.com/payloadcms/ecommerce-example-website).

## Development

To spin up the boilerplate, follow these steps:

1.  First clone the repo
1.  Then, `cd YOUR_PROJECT_REPO && yarn && yarn dev`
1.  Now open `http://localhost:8000/admin` in your browser
1.  Create your first admin user using the form on the page

That's it! Changes made in `./src` will be reflected in your app. You can optionally seed the database with a few products and pages, more details on that [here](#seed).

### Stripe

To integrate with Stripe, follow these steps:

1. You will first need to create a [Stripe](https://stripe.com/) account if you do not already have one.
1. Retrieve your Stripe Secret Key from the Stripe admin panel and paste it into your `env`:
   ```bash
   STRIPE_SECRET_KEY=
   ```
1. In another terminal, listen for webhooks:
   ```bash
   stripe login # follow the prompts
   stripe listen --forward-to localhost:8000/stripe/webhooks
   ```
1. Paste the given webhook signing secret into your `env`:
   ```bash
   STRIPE_WEBHOOKS_ENDPOINT_SECRET=
   ```

See the official [Payload Stripe Plugin](https://github.com/payloadcms/plugin-stripe) for more details.

### Seed

To seed the database with a few products and pages you can run `yarn seed`.

> NOTICE: seeding the database is destructive because it drops your current database to populate a fresh one from the seed template. Only run this command if you are starting a new project or can afford to lose your current data.
