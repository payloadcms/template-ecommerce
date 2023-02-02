import { StripeWebhookHandler } from "@payloadcms/plugin-stripe/dist/types";
import Stripe from "stripe";

const logs = false;

export const productUpdated: StripeWebhookHandler<{
  data: {
    object: Stripe.Product;
  }
}> = async (args) => {
  const {
    event,
    payload,
    stripe
  } = args;

  const {
    id: stripeProductID,
    // name: stripeProductName,
    description: stripeDescription
  } = event.data.object;

  if (logs) payload.logger.info(`Syncing Stripe product with ID: ${stripeProductID} to Payload...`);

  let payloadProductID;

  // First lookup the product in Payload
  try {
    if (logs) payload.logger.info(`- Looking up existing Payload product...`);

    const productQuery = await payload.find({
      collection: 'products',
      where: {
        stripeProductID: {
          equals: stripeProductID
        }
      }
    });

    payloadProductID = productQuery.docs?.[0]?.id;

    if (payloadProductID) {
      if (logs) payload.logger.info(`- Found existing product with Stripe ID: ${stripeProductID}, syncing now...`);
    }

  } catch (error: any) {
    payload.logger.error(`Error finding product ${error?.message}`);
  }

  let prices;

  try {
    if (logs) payload.logger.info(`- Looking up all prices associated with this product...`);

    // find all stripe prices that are assigned to "payloadProductID"
    prices = await stripe.prices.list({
      product: stripeProductID,
      limit: 100
    });

  } catch (error) {
    payload.logger.error(`- Error looking up prices: ${error}`);
  }

  try {
    if (logs) payload.logger.info(`- Updating document...`);

    await payload.update({
      collection: 'products',
      id: payloadProductID,
      data: {
        // name: stripeProductName,
        // description: stripeDescription,
        priceJSON:  JSON.stringify(prices),
        skipSync: true
      }
    })

    if (logs) payload.logger.info(`✅ Successfully updated product.`);
  } catch (error) {
    payload.logger.error(`- Error updating product: ${error}`);
  }
};
