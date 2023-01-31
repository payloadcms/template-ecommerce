import { Product } from "../payload-types";

export const product3: Partial<Product> = {
  "title": "Pro Membership",
  "layout": [
    {
      blockType: "content",
      "contentBackgroundColor": "white",
      "columns": [
        {
          size: 'twoThirds',
          richText: [
            {
              "children": [
                {
                  text: "All content from this point is completely dynamic using custom layout building block configured in the CMS. This can be anything you'd like."
                }
              ]
            }
          ],
          link: {
            reference: {
              relationTo: 'pages',
              value: ''
            },
            url: '',
            label: ''
          }
        }
      ]
    },
  ],
  stripeProductID: "prod_NBPiSz1Vg6Ay0O",
  "slug": "Pro Membership",
  "_status": "published",
  "meta": {
    "title": "Pro Membership",
    "description": "Recurring subscription to a digital asset"
  }
}
