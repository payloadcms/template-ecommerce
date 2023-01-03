import type { Payload } from 'payload'
import type { FieldAccess } from 'payload/types'
import { Customer, Product } from '../../../payload-types'

type Subscriptions = Customer['subscriptions']

const isUserSubscribedToProduct = ({ user, stripeProductID }: { user: Customer; stripeProductID: string }): boolean => {
  if (!stripeProductID) return true

  const subscriptions: Subscriptions = user?.subscriptions

  const isSubscribed = subscriptions?.some(subscription => {
    const { stripeProductID: subscriptionID } = subscription
    return subscriptionID === stripeProductID
  })

  if (isSubscribed) {
    return true
  }

  return false
}

// we need to prevent access to documents behind a paywall
// to do this we check the document against the user's list of active subscriptions
export const checkSubscriptions: FieldAccess<Product> = async ({ req: { user, payload }, doc }) => {
  if (!user) {
    return false
  }

  if (doc?.stripeProductID) {
    const isSubscribed = isUserSubscribedToProduct({
      user,
      stripeProductID: doc.stripeProductID,
    })

    if (isSubscribed) {
      return true
    }

    return false
  }

  return true
}
