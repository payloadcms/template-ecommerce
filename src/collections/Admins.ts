import { CollectionConfig } from 'payload/types';
import { admins } from '../access/admins';

const Admins: CollectionConfig = {
  slug: 'admins',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  timestamps: true,
  access: {
    read: admins,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [],
};

export default Admins;