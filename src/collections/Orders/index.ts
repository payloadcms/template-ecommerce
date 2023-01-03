import { CollectionConfig } from 'payload/types';
import { CustomerFields } from '../Customers';
import { ProductFields } from '../Products';
import { admins } from './access/admins';
import { adminsAndOrderedBy } from './access/adminsAndOrderedBy';

const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'product',
    defaultColumns: [
      'product',
      'createdAt',
    ]
  },
  access: {
    read: adminsAndOrderedBy,
    create: adminsAndOrderedBy,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'orderedBy',
      type: 'group',
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: 'customer',
          type: 'relationship',
          relationTo: 'customers',
          hasMany: false,
        },
        ...CustomerFields
      ]
    },
    {
      name: 'products',
      type: 'array',
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          hasMany: false,
        },
        ...ProductFields,
      ]
    }
  ],
}

export default Orders;