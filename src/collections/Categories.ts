import { CollectionConfig } from 'payload/types';

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    }
  ]
}

export default Categories;