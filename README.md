# Payload Commerce Boilerplate

A boilerplate for [Payload CMS](https://github.com/payloadcms/payload) to power your online store. The front-end boilerplate for this repo can be found [here](https://github.com/payloadcms/commerce-example-website).

Core features:

- Pre-configured Payload config
- Authentication-enabled
- Access control configured
- Implements the official [Payload Stripe Plugin](https://github.com/payloadcms/plugin-stripe)
<!-- - Dynamic product price builder -->

## How it works

This come pre-configured with the following collections:

- `Customers`

  - They can authenticate on your front-end, create shopping carts, and place orders. Only they and admins can r

- `Products`

  - These are linked to Stripe for management via a select field that is dynamically populated in the products sidebar. This field fetches all available products in the background and displays them for you to select.

- `Categories`

  - Taxonomy used to group products together.

- `Orders`

  - Static copy of customer and product data at the time of the order, because customers and products are subject to change over time.

- `Admins`

  - They can access Payload's admin panel and manage your store.

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
