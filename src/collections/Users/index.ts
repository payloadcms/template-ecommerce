import { CollectionConfig } from 'payload/types';
import { admins } from '../../access/admins';
import { anyone } from '../../access/anyone';
import adminsAndUser from './access/adminsAndUser';
import checkRole from './checkRole';
import { afterChange } from './hooks/afterChange';
import { beforeValidate } from './hooks/beforeValidate';
import { CustomerSelect } from './ui/CustomerSelect';
import { StripeLink } from './ui/StripeLink';

export const UserFields: CollectionConfig['fields'] = [
  {
    name: 'name',
    type: 'text',
  },
  {
    name: 'roles',
    type: 'select',
    hasMany: true,
    options: [
      {
        label: 'admin',
        value: 'admin'
      },
      {
        label: 'customer',
        value: 'customer'
      }
    ]
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
    type: 'tabs',
    tabs: [
      {
        label: 'Cart',
        fields:  [
          {
            name: 'items',
            label: 'Items',
            type: 'array',
            fields: [
              {
                name: 'product',
                type: 'relationship',
                relationTo: 'products',
              },
              {
                name: 'quantity',
                type: 'number',
                admin: {
                  step: 1,
                }
              },
            ]
          },
          {
            name: 'createdOn',
            label: 'Created On',
            type: 'date',
            admin: {
              readOnly: true
            }
          },
          {
            name: 'lastModified',
            label: 'Last Modified',
            type: 'date',
            admin: {
              readOnly: true
            }
          },
        ],
      },
      {
        label: 'Subscriptions',
        fields: [
          {
            name: 'Subscriptions',
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
              },
              {
                name: 'createdOn',
                label: 'Created On',
                type: 'date',
                admin: {
                  readOnly: true
                }
              },
              {
                name: 'lastModified',
                label: 'Last Modified',
                type: 'date',
                admin: {
                  readOnly: true
                }
              },
            ]
          }
        ]
      }
    ],
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

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: [
      'name',
      'email',
    ],
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user }}) => {
      return checkRole(['admin'], user)
    }
  },
  hooks: {
    beforeValidate: [
      beforeValidate // protect the `roles` field in the create hook
    ],
    afterChange: [
      afterChange // auto login customers in when they create new accounts
    ],
  },
  auth: true,
  fields: UserFields,
  timestamps: true,
}

export default Users;
