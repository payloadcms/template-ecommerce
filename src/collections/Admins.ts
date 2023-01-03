import { CollectionConfig } from 'payload/types';

const Admins: CollectionConfig = {
  slug: 'admins',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};

export default Admins;