export const product1 = {
  "title": "Cotton T-Shirt",
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
  ],
  "slug": "cotton-t",
  "_status": "published",
  "meta": {
    "title": "Cotton T-Shirt",
    "description": "One-time purchase for a physical product",
    "image": "{{SHIRTS_IMAGE}}"
  }
}
