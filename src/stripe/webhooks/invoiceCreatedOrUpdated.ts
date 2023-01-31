import { Order } from "../../payload-types";

const logs = true;

export const invoiceCreatedOrUpdated = async (args) => {
  const {
    event,
    payload,
    stripe
  } = args;

  const {
    id: stripeInvoiceID,
    payment_intent: stripePaymentIntentID,
    items: invoiceItems,
    customer: invoiceCustomerID
  } = event.data.object;

  if (logs) payload.logger.info(`🪝 An invoice was created or updated in Stripe, syncing to Payload...`);

  let existingOrder: Order;

  if (stripeInvoiceID) {
    existingOrder = await payload.find({
      collection: 'orders',
      where: {
        stripeInvoiceID: {
          equals: stripeInvoiceID
        }
      }
    })
  }

  const users = await payload.find({
    collection: 'users',
    where: {
      stripeCustomerID: {
        equals: invoiceCustomerID
      }
    }
  })

  const [user] = users.docs;

  try {
    if (invoiceItems) {
      // find all payload products that are assigned to "stripeProductID"
      const products = await Promise.all(invoiceItems.data.map(async (item) => {
        const productQuery = await payload.find({
          collection: 'products',
          where: {
            stripeProductID: {
              equals: item.price.product
            }
          }
        })

        const [product] = productQuery.docs;

        return {
          product: product.id,
          title: product.title,
          priceJSON: product.priceJSON,
          stripeProductID: product.stripeProductID,
          quantity: item.quantity
        }
      }));

      const orderData = {
        stripeInvoiceID,
        stripePaymentIntentID,
        createdBy: {
          user: user.id,
          name: user.name,
          email: user.email,
          stripeCustomerID: user.stripeCustomerID
        },
        products: products,
      }

      if (existingOrder) {
        // update order
        await payload.update({
          collection: 'orders',
          id: existingOrder.id,
          data: orderData
        });
      } else {
        // create order
        await payload.create({
          collection: 'orders',
          data: orderData
        });
      }
    }

    if (logs) payload.logger.info(`✅ Successfully synced invoice.`);
  } catch (error) {
    payload.logger.error(`- Error syncing invoice: ${error}`);
  }
};
