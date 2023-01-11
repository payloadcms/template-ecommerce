import { Payload } from 'payload';
import path from 'path';
import { home } from './home';
import { anotherPage } from './another-page';
import { product1 } from './product-1';

export const seed = async (payload: Payload) => {
  await payload.create({
    collection: 'users',
    data: {
      email: 'dev@payloadcms.com',
      password: 'test',
      roles: ['admin']
    }
  });

  const { id: shirtsImageID } = await payload.create({
    collection: 'media',
    filePath: path.resolve(__dirname, 'shirts.jpg'),
    data: {
      alt: 'Shirts',
      caption: [
        {
          "children": [
            {
              "text": "Photo by "
            },
            {
              "type": "link",
              "linkType": "custom",
              "url": "https://unsplash.com/@henmankk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
              "newTab": true,
              "children": [
                {
                  "text": "Keagan Henman"
                }
              ]
            },
            {
              "text": " on "
            },
            {
              "type": "link",
              "linkType": "custom",
              "url": "https://unsplash.com/photos/Won79_9oUEk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
              "newTab": true,
              "children": [
                {
                  "text": "Unsplash"
                }
              ]
            },
            {
              "text": "."
            }
          ],
        },
      ]
    },
  });

  const homepageJSON = JSON.parse(JSON.stringify(home).replace(/{{SHIRTS_IMAGE}}/g, shirtsImageID));

  await payload.create({
    collection: 'pages',
    data: homepageJSON,
  })

  const anotherPageJSON = JSON.parse(JSON.stringify(anotherPage).replace(/{{SHIRTS_IMAGE}}/g, shirtsImageID));

  const { id: anotherPageID } = await payload.create({
    collection: 'pages',
    data: anotherPageJSON,
  })

  const product1JSON = JSON.parse(JSON.stringify(product1).replace(/{{SHIRTS_IMAGE}}/g, shirtsImageID));

  await payload.create({
    collection: 'products',
    data: product1JSON,
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        {
          link: {
            type: 'custom',
            url: 'https://github.com/payloadcms/payload',
            label: 'GitHub',
          }
        },
        {
          link: {
            type: 'custom',
            url: 'https://payloadcms.com',
            label: 'Payload',
          }
        },
        {
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: anotherPageID
            },
            label: 'Another Page',
          }
        }
      ]
    }
  })
}
