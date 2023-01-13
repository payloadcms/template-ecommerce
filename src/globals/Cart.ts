import { GlobalConfig } from "payload/types";
import { Archive } from "../blocks/Archive";
import { CallToAction } from "../blocks/CallToAction";
import { Content } from "../blocks/Content";
import { MediaBlock } from "../blocks/Media";
import { hero } from "../fields/hero";

export const Cart: GlobalConfig = {
  slug: 'cart',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'shopPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Shop page',
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
          admin: {
            description: 'This content is rendered after the cart items are displayed.'
          },
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive
              ]
            }
          ]
        },
      ],
    },
  ]
}
