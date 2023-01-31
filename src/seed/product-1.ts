import { Product } from "../payload-types";

export const product1: Partial<Product> = {
  "title": "Cotton T-Shirt",
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
  stripeProductID: "prod_NBPZCQwrQXcngM",
  "slug": "cotton-t",
  "_status": "published",
  "meta": {
    "title": "Cotton T-Shirt",
    "description": "One-time purchase for a physical product",
    "image": "{{SHIRTS_IMAGE}}"
  }
}
