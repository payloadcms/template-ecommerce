import { Access } from "payload/config";

export const adminsAndOrderedBy: Access = ({ req: { user } }) => {
  if (user) {
    if (user.collection === 'admins') {
      return true;
    }

    if (user.collection === 'customers' && user.stripeCustomerID) {
      return {
        'orderedBy.stripeCustomerID': user.stripeCustomerID,
      }
    }
  }

  return true;
};