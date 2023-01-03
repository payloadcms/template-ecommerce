import { CollectionConfig } from 'payload/types';
import { admins } from './access/admins';
import { adminsAndCustomer } from './access/adminsAndCustomer';
import { anyone } from './access/anyone';
import { CustomerSelect } from './ui/CustomerSelect';

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

    },
    admin: {
      position: 'sidebar',
      components: {
        Field: CustomerSelect
      }
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