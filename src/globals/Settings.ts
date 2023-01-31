import { GlobalConfig } from "payload/types";
import link from "../fields/link";

export const Settings: GlobalConfig = {
  slug: 'settings',
  typescript: {
    interface: 'Settings',
  },
  graphQL: {
    name: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'shopPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Shop page',
    }
  ]
}
