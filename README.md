# Payload Commerce Boilerplate

A boilerplate for [Payload CMS](https://github.com/payloadcms/payload) to power your online store. The front-end boilerplate for this repo can be found [here](https://github.com/payloadcms/commerce-example-website).

Core features:

- Pre-configured Payload config
- Authentication-enabled
- Access control configure
- Dynamic page builder
- Stripe enabled using the official [Payload Stripe Plugin](https://github.com/payloadcms/plugin-stripe)
- SEO enabled using the official [Payload SEO Plugin](https://github.com/payloadcms/plugin-seo)

## How it works

This come pre-configured with the following `collections`:

- `Customers`

  Customers can authenticate on your front-end, create shopping carts, and place orders. Only they and admins can read customer data.

- `Products`

  Each product is linked to Stripe via a select field that is dynamically populated in the products sidebar. This field fetches all available products in the background and displays them for you to select. Once set, product prices are automatically synced between Stripe and Payload. Products are also page-builder enabled, meaning you can generate dynamic pages for each product using layout-building blocks.

- `Categories`

  A taxonomy used to group products together. Categories can be nested, i.e. "Shirts > Red". See [Payload Nested Docs Plugin](https://github.com/payloadcms/plugin-nested-docs) for more details.

- `Orders`

  A static copy of customer and product data at the time of the order, because customers and products are subject to change over time.

- `Pages`

  An arbitrary page of dynamic content using layout building blocks, i.e. home page.

- `Media`

  An uploads-enabled collection used by products and pages.

- `Admins`

  Admins can access Payload's admin panel and manage your store.

The following `globals` are also configured:

- `Header`

  The data required by the header on your front-end, i.e. an array of nav links.

- `Footer`

  Same as above but for the footer.

## Stripe

To integrate with Stripe, follow these steps:

1. You will first need to create a [Stripe](https://stripe.com/) account if you do not already have one.
1. Retrieve your Stripe Secret Key from the Stripe admin panel and paste it into your `env`:
   ```bash
   STRIPE_SECRET_KEY=
   ```

See the official [Payload Stripe Plugin](https://github.com/payloadcms/plugin-stripe) for more details.

## Development

To spin up the boilerplate, follow these steps:

1.  First clone the repo
1.  Then, `cd YOUR_PROJECT_REPO && yarn && yarn && yarn dev`
1.  Now open `http://localhost:3000/admin` in your browser
1.  Create your first admin user using the form on the page

That's it! Changes made in `./src` will be reflected in your app.
