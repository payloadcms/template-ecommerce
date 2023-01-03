import { CollectionConfig } from 'payload/types';
import { admins } from './access/admins';
import { adminsAndCustomer } from './access/adminsAndCustomer';
import { anyone } from './access/anyone';
import { CustomerSelect } from './ui/CustomerSelect';
import { StripeLink } from './ui/StripeLink';

export const CustomerFields: CollectionConfig['fields'] = [
  {
    name: 'name',
    type: 'text',
  },
  {
    name: 'stripeCustomerID',
    label: 'Stripe Customer',
    type: 'text',
    access: {
      // TODO: access control for this field
    },
    admin: {
      position: 'sidebar',
      components: {
        Field: CustomerSelect
      }
    }
  },
  {
    name: 'subscriptions',
    label: 'Subscriptions',
    type: 'array',
    admin: {
      description: 'All subscriptions are managed in Stripe and will be reflected here. Use the link in the sidebar go directly to this customer in Stripe to begin managing their subscriptions.',
    },
    fields: [
      {
        name: 'link',
        label: 'Link',
        type: 'ui',
        admin: {
          components: {
            Field: (args) => StripeLink({
              ...args,
              stripeResourceType: 'subscriptions',
              nameOfIDField: 'stripeSubscriptionID'
            }),
          }
        }
      },
      {
        name: 'stripeSubscriptionID',
        label: 'Stripe Subscription ID',
        type: 'text',
        admin: {
          readOnly: true,
        }
      },
      {
        name: 'stripeProductID',
        label: 'Stripe Product ID',
        type: 'text',
        admin: {
          readOnly: true,
        }
      },
      {
        name: 'product',
        type: 'relationship',
        relationTo: 'products',
        admin: {
          readOnly: true,
        }
      },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        admin: {
          readOnly: true
        },
        options: [
          {
            label: 'Active',
            value: 'active'

          },
          {
            label: 'Canceled',
            value: 'canceled'
          },
          {
            label: 'Incomplete',
            value: 'incomplete'
          },
          {
            label: 'Incomplete Expired',
            value: 'incomplete_expired'
          },
          {
            label: 'Past Due',
            value: 'past_due'
          },
          {
            label: 'Trialing',
            value: 'trialing'
          },
          {
            label: 'Unpaid',
            value: 'unpaid'
          }
        ],
      }
    ]
  },
  {
    name: "skipSync",
    label: "Skip Sync",
    type: "checkbox",
    admin: {
      position: 'sidebar',
      readOnly: true,
      hidden: true,
    }
  },
]

const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: [
      'name',
      'email',
    ],
  },
  access: {
    read: adminsAndCustomer,
    create: anyone,
    update: adminsAndCustomer,
    delete: admins,
  },
  auth: true,
  fields: CustomerFields
}

export default Customers;