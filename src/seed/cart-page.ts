export const cartPage = {
  shopPage: "{{SHOP_PAGE_ID}}",
  hero: {
    type: "lowImpact",
    richText: [
      {
        type: "h1",
        children: [
          {
            text: "Cart"
          }
        ]
      },
      {
        type: "p",
        children: [
          {
            text: "This cart saves to local storage so you can continue shopping later, then when you authenticate with Payload, it syncs to your user profile "
          },
          {
            text: "so you can continue shopping from any device",
            bold: true
          },
          {
            text: ". This hero and the content below the cart are completely dynamic and configured in the CMS."
          }
        ]
      }
    ],
  },
  layout: [
    {
      blockType: "content",
      "contentBackgroundColor": "white",
      "layout": "oneColumn",
      "columnOne": {
        richText: [
          {
            "children": [
              {
                text: "This content is completely dynamic, you can render anything you'd like here. These are custom layout building block configured in the CMS."
              }
            ]
          }
        ]
      }
    },
    {
      "ctaBackgroundColor": "white",
      "richText": [
        {
          "children": [
            {
              "text": "Continue shopping"
            }
          ],
          "type": "h4"
        },
        {
          "children": [
            {
              "text": "This is a custom layout building block configured in the CMS."
            }
          ]
        }
      ],
      "links": [
        {
          "link": {
            "type": "reference",
            reference: {
              relationTo: 'pages',
              value: "{{SHOP_PAGE_ID}}"
            },
            "label": "Shop now",
            "appearance": "primary"
          }
        },
      ],
      "blockName": "CTA",
      "blockType": "cta"
    }
  ],
}
