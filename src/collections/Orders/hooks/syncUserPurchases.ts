import { AfterChangeHook } from "payload/dist/collections/config/types";
import { Order, User } from "../../../payload-types";

export const syncUserPurchases: AfterChangeHook<Order> = async ({ req, doc, operation }) => {
    if (operation === 'create') {
        const { orderedBy, products } = doc;
        const { user } = orderedBy;

        const fullUser: User = await req.payload.findByID({
          collection: 'users',
          id: typeof user === 'object' ? user.id : user,
        })

        if (fullUser && typeof fullUser === 'object') {
          const { purchases } = fullUser;

            await req.payload.update({
              collection: 'users',
              id: fullUser.id,
              data: {
                purchases: [
                  ...purchases.map((purchase) => typeof purchase === 'object' ? purchase.id : purchase),
                  ...products.map(({ product } ) => typeof product === 'object' ? product.id : product),
                ]
              }
            });
        }
    }
}
