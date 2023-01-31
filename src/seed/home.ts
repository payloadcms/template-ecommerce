import { Page } from "../payload-types";

export const home: Partial<Page> = {
  "title": "Home",
  "hero": {
    "type": "highImpact",
    "richText": [
      {
        "children": [
          {
            "text": "E-Commerce Store with Payload + Next.js"
          }
        ],
        "type": "h1"
      },
      {
        "children": [
          {
            "text": "The code for this website is completely open-source and can be found "
          },
          {
            "type": "link",
            "linkType": "custom",
            "url": "https://github.com/payloadcms/ecommerce-example-website",
            "newTab": true,
            "children": [
              {
                "text": "here"
              }
            ]
          },
          {
            "text": "."
          }
        ],
        "type": "large-body"
      },
    ],
    "links": [
      {
        link: {
          type: 'reference',
          appearance: 'primary',
          reference: {
            relationTo: 'pages',
            value: "{{SHOP_PAGE_ID}}"
          },
          label: 'Shop now',
          url: ''
        }
      },
    ],
    "media": "{{SHIRTS_IMAGE}}"
  },
  "layout": [
    {
      "blockName": "Content Block",
      "blockType": "content",
      "contentBackgroundColor": "white",
      "columns": [
        {
          "size": "oneThird",
          "richText": [
            {
              "children": [
                {
                  "text": "Authentication"
                }
              ],
              "type": "h3"
            },
            {
              "children": [
                {
                  "text": "Customers can create an account and login to view their order history and more."
                }
              ]
            }
          ],
          enableLink: false,
          link: {
            reference: {
              value: '',
              relationTo: 'pages'
            },
            url: '',
            label: ''
          }
        },
        {
          "size": "oneThird",
          "richText": [
            {
              "children": [
                {
                  "text": "Shopping cart"
                }
              ],
              "type": "h3"
            },
            {
              "children": [
                {
                  "text": "Shopping carts persist between sessions and can be accessed from any device."
                }
              ]
            }
          ],
          enableLink: false,
          link: {
            reference: {
              value: '',
              relationTo: 'pages'
            },
            url: '',
            label: ''
          }
        },
        {
          "size": "oneThird",
          "richText": [
            {
              "children": [
                {
                  "text": "Checkout"
                }
              ],
              "type": "h3"
            },
            {
              "children": [
                {
                  "text": "Secure in-app checkout powered by Stripe so your customers never leave your site."
                }
              ]
            }
          ],
          enableLink: false,
          link: {
            reference: {
              value: '',
              relationTo: 'pages'
            },
            url: '',
            label: ''
          }
        },
        {
          "size": "oneThird",
          "richText": [
            {
              "children": [
                {
                  "text": "Page builder"
                }
              ],
              "type": "h3"
            },
            {
              "children": [
                {
                  "text": 'Custom page builder allows you to create any page or product layout imaginable.'
                }
              ]
            }
          ],
          enableLink: false,
          link: {
            reference: {
              value: '',
              relationTo: 'pages'
            },
            url: '',
            label: ''
          }
        },
        {
          "size": "oneThird",
          "richText": [
            {
              "children": [
                {
                  "text": "SEO"
                }
              ],
              "type": "h3"
            },
            {
              "children": [
                {
                  "text": "Editors have complete control over SEO data directly from the CMS."
                }
              ]
            }
          ],
          enableLink: false,
          link: {
            reference: {
              value: '',
              relationTo: 'pages'
            },
            url: '',
            label: ''
          }
        },
        {
          "size": "oneThird",
          "richText": [
            {
              "children": [
                {
                  "text": "Lorem ipsum"
                }
              ],
              "type": "h3"
            },
            {
              "children": [
                {
                  "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
                }
              ]
            }
          ],
          enableLink: false,
          link: {
            reference: {
              value: '',
              relationTo: 'pages'
            },
            url: '',
            label: ''
          }
        },
      ]
    },
    {
      "mediaBlockBackgroundColor": "white",
      "position": "default",
      "media": "{{SHIRTS_IMAGE}}",
      "blockName": "Media Block",
      "blockType": "mediaBlock"
    },
    {
      "ctaBackgroundColor": "white",
      "richText": [
        {
          "children": [
            {
              "text": "Shop now"
            }
          ],
          "type": "h4"
        },
        {
          "children": [
            {
              "text": "This is a custom layout building block configurable in the CMS."
            }
          ]
        }
      ],
      "links": [
        {
          "link": {
            "type": "reference",
            "url": "",
            "label": "Shop now",
            "appearance": "primary",
            reference: {
              value: "{{SHOP_PAGE_ID}}",
              relationTo: 'pages'
            }
          }
        },
      ],
      "blockName": "CTA",
      "blockType": "cta"
    }
  ],
  "slug": "home",
  "_status": "published",
  "meta": {
    "title": "Store ABC",
    "description": "E-Commerce Store with Payload + Next.js",
    "image": "{{SHIRTS_IMAGE}}"
  }
}
