import { CollectionConfig } from 'payload/types';
import { ProductSelect } from './ui/ProductSelect';
import { slugField } from '../../fields/slug';
import { hero } from '../../fields/hero';
import { CallToAction } from '../../blocks/CallToAction';
import { Content } from '../../blocks/Content';
import { MediaBlock } from '../../blocks/Media';
import { checkSubscriptions } from './access/checkSubscriptions';
import { beforeProductChange } from './hooks/beforeChange';
import { admins } from '../../access/admins';

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
        label: 'Product Details',
        fields: [
          {
            name: 'stripeProductID',
            label: 'Stripe Product',
            type: 'text',
            admin: {
              components: {
                Field: ProductSelect
              }
            }
          },
          {
            name: "priceJSON",
            label: "Price JSON",
            type: "textarea",
            admin: {
              readOnly: true,
              rows: 10
            }
          },
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
    name: 'categories',
    type: 'relationship',
    relationTo: 'categories',
    hasMany: true,
    admin: {
      position: 'sidebar',
    }
  },
  slugField(),
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

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins
  },
  hooks: {
    beforeChange: [beforeProductChange],
  },
  fields: ProductFields,
}

export default Products;