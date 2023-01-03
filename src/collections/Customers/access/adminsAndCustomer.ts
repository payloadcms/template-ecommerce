import { Access } from "payload/config";

export const adminsAndCustomer: Access = ({ req: { user } }) => {
  if (user) {
    if (user.collection === 'admins') {
      return true;
    }

    if (user.collection === 'customers' && user.stripeID) {
      return {
        stripeID: user.stripeID
      }
    }
  }

  return true;
};