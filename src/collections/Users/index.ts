import type { CollectionConfig } from 'payload/types'
import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'
import adminsAndUser from './access/adminsAndUser'
import { checkRole } from './checkRole'
import { createStripeCustomer } from './hooks/createStripeCustomer'
import { loginAfterCreate } from './hooks/loginAfterCreate'
import { protectRolesBeforeCreate } from './hooks/protectRolesBeforeCreate'
import { CustomerSelect } from './ui/CustomerSelect'

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
        value: 'admin',
      },
      {
        label: 'customer',
        value: 'customer',
      },
    ],
    hooks: {
      beforeChange: [protectRolesBeforeCreate],
    },
  },
  {
    name: 'purchases',
    label: 'Purchases',
    type: 'relationship',
    relationTo: 'products',
    hasMany: true,
  },
  {
    name: 'stripeCustomerID',
    label: 'Stripe Customer',
    type: 'text',
    access: {
      read: ({ req: { user } }) => checkRole(['admin'], user),
    },
    admin: {
      position: 'sidebar',
      components: {
        Field: CustomerSelect,
      },
    },
  },
  {
    label: 'Cart',
    name: 'cart',
    type: 'group',
    fields: [
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
            min: 1,
            admin: {
              step: 1,
            },
          },
        ],
      },
      // If you wanted to maintain a 'created on'
      // or 'last modified' date for the cart
      // you could do so here:
      // {
      //   name: 'createdOn',
      //   label: 'Created On',
      //   type: 'date',
      //   admin: {
      //     readOnly: true
      //   }
      // },
      // {
      //   name: 'lastModified',
      //   label: 'Last Modified',
      //   type: 'date',
      //   admin: {
      //     readOnly: true
      //   }
      // },
    ],
  },
  {
    name: 'skipSync',
    label: 'Skip Sync',
    type: 'checkbox',
    admin: {
      position: 'sidebar',
      readOnly: true,
      hidden: true,
    },
  },
]

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  hooks: {
    beforeChange: [createStripeCustomer],
    afterChange: [loginAfterCreate],
  },
  auth: true,
  fields: UserFields,
  timestamps: true,
}

export default Users
