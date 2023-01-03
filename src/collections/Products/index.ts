import { CollectionConfig } from 'payload/types';
import { ProductSelect } from './ui/ProductSelect';
import { slugField } from '../../fields/slug';
import { hero } from '../../fields/hero';
import { CallToAction } from '../../blocks/CallToAction';
import { Content } from '../../blocks/Content';
import { MediaBlock } from '../../blocks/Media';
import { checkSubscriptions } from './access/checkSubscriptions';

export const ProductFields: CollectionConfig['fields'] = [
  {
    name: 'title',
    type: 'text',
    required: true,
  },
  {
    name: 'description',
    type: 'text',
  },
  {
    type: 'tabs',
    tabs: [
      {
        label: 'Hero',
        fields: [
          hero,
        ]
      },
      {
        label: 'Content',
        fields: [
          {
            name: 'layout',
            type: 'blocks',
            required: true,
            blocks: [
              CallToAction,
              Content,
              MediaBlock,
            ]
          }
        ]
      },
      {
        label: 'Gated Assets',
        fields: [
          {
            name: 'gatedAssets',
            label: 'Gated Assets',
            type: 'array',
            access: {
              read: checkSubscriptions,
            },
            fields: []
          },
        ]
      }
    ],
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
  {
    name: 'categories',
    type: 'relationship',
    relationTo: 'categories',
    hasMany: true,
    admin: {
      position: 'sidebar',
    }
  },
  slugField(),
]

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
  },
  fields: ProductFields
}

export default Products;