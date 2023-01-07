import { CollectionConfig } from 'payload/types';
import { CustomerFields } from '../Customers';
import { ProductFields } from '../Products';
import { admins } from '../../access/admins';
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
  timestamps: true,
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
        ...CustomerFields // keep a static copy of these fields as they appear at the time of the order
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
        ...ProductFields, // keep a static copy of these fields as they appear at the time of the order
      ]
    }
  ],
}

export default Orders;