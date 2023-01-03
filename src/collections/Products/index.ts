import { CollectionConfig } from 'payload/types';
import { ProductSelect } from './ui/ProductSelect';

export const ProductFields: CollectionConfig['fields'] = [
  {
    name: 'name',
    type: 'text',
  },
  {
    name: 'description',
    type: 'text',
  },
  {
    name: 'categories',
    type: 'relationship',
    relationTo: 'categories',
    hasMany: true,
    admin: {
      position: 'sidebar',
    }
  },
  {
    name: 'stripeProductID',
    label: 'Stripe Product',
    type: 'text',
    admin: {
      position: 'sidebar',
      components: {
        Field: ProductSelect
      }
    }
  },
]

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  fields: ProductFields
}

export default Products;