import { Product } from "../payload-types";

export const product3: Partial<Product> = {
  "title": "Online Course",
  stripeProductID: "prod_NGzgr62LTu1M6T",
  "slug": "Online Course",
  "_status": "published",
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
                  text: "All content from this point is completely dynamic using custom layout building block configured in the CMS. This can be anything you'd like. Purchase this product to gain access to the gated content behind the paywall."
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
  paywall: [
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
                  text: "This paywall content and can be anything you'd like. It is only available to users who have purchased this product. If you are seeing this, you have purchased this product."
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
  "meta": {
    "title": "Online Course",
    "description": "One-time purchase for gated content",
    "image": "{{COURSE_IMAGE}}"
  }
}
