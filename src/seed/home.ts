export const home = {
  "title": "Home",
  "hero": {
    "type": "highImpact",
    "richText": [
      {
        "children": [
          {
            "text": "E-Commerce Store with Payload+Next.js"
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
    "links": [],
    "media": "{{SHIRTS_IMAGE}}"
  },
  "layout": [
    {
      "contentBackgroundColor": "white",
      "layout": "oneColumn",
      "columnOne": {
        "richText": [
          {
            "children": [
              {
                "text": "Here is a one-column content block."
              }
            ],
            "type": "h3"
          },
          {
            "children": [
              {
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              }
            ]
          }
        ],
        "enableLink": true,
        "link": {
          "type": "custom",
          "url": "https://payloadcms.com",
          "label": "Go to Payload",
          "appearance": "primary"
        }
      },
      "blockName": "One column",
      "blockType": "content"
    },
    {
      "contentBackgroundColor": "white",
      "layout": "halfAndHalf",
      "columnOne": {
        "richText": [
          {
            "children": [
              {
                "text": "Here is a two-column content block."
              }
            ],
            "type": "h3"
          },
          {
            "children": [
              {
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              }
            ]
          }
        ],
        "enableLink": true,
        "link": {
          "type": "custom",
          "url": "https://payloadcms.com",
          "label": "Go to Payload",
          "appearance": "default"
        }
      },
      "columnTwo": {
        "richText": [
          {
            "children": [
              {
                "text": "Here is a two-column content block."
              }
            ],
            "type": "h3"
          },
          {
            "children": [
              {
                "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              }
            ]
          }
        ],
        "enableLink": true,
        "link": {
          "type": "custom",
          "url": "https://payloadcms.com",
          "label": "Go to Payload",
          "appearance": "default"
        }
      },
      "blockName": "Two column",
      "blockType": "content"
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
          "type": "h2"
        },
        {
          "children": [
            {
              "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
            }
          ]
        }
      ],
      "links": [
        {
          "link": {
            "type": "custom",
            "url": "https://payloadcms.com",
            "label": "Go to Payload",
            "appearance": "primary"
          }
        },
        {
          "link": {
            "type": "custom",
            "url": "https://github.com/payloadcms/payload",
            "label": "Go to GitHub",
            "appearance": "secondary"
          }
        }
      ],
      "blockName": "CTA",
      "blockType": "cta"
    }
  ],
  "slug": "home",
  "_status": "published",
  "meta": {
    "title": "Store ABC",
    "description": "E-Commerce Store with Payload+Next.js",
    "image": "{{SHIRTS_IMAGE}}"
  }
}
