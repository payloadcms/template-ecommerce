import { Product } from "../payload-types";

export const product2: Partial<Product> = {
  "title": "E-Book",
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
  stripeProductID: "prod_NBPiXegr0QkVny",
  "slug": "ebook",
  "_status": "published",
  "meta": {
    "title": "E-Book",
    "description": "One-time purchase for a digital asset"
  }
}
