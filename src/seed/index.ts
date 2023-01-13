import { Payload } from 'payload';
import path from 'path';
import { home } from './home';
import { shopPage } from './shop-page';
import { product1 } from './product-1';
import { product3 } from './product-3';
import { product2 } from './product-2';
import { shirtImage } from './shirt-image';
import { candlesImage } from './candles-image';
import { earingsImage } from './earings-image';
import { product4 } from './product-4';
import { product5 } from './product-5';
import { product6 } from './product-6';

export const seed = async (payload: Payload) => {
  await payload.create({
    collection: 'users',
    data: {
      email: 'dev@payloadcms.com',
      password: 'test',
      roles: ['admin']
    }
  });

  const [
    shirtDoc,
    candlesDoc,
    earingsDoc
  ] = await Promise.all([
    payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, 'shirts.jpg'),
      data: shirtImage
    }),
    payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, 'candles.jpg'),
      data: candlesImage
    }),
    payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, 'earings.jpg'),
      data: earingsImage
    })
  ])

  const [
    clothingCategory,
    jewelryCategory,
    decorCategory,
    ebookCategory,
    coachingCategory,
    advancedCategory
  ]= await Promise.all([
    payload.create({
      collection: 'categories',
      data: {
        title: 'Clothing'
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Jewelry'
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Decor'
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'E-Book'
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Online Coaching'
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Advanced'
      },
    })
  ]);

  Promise.all([
    payload.create({
      collection: 'products',
      data: JSON.parse(JSON.stringify({...product1, categories: [clothingCategory.id]})
        .replace(/{{SHIRTS_IMAGE}}/g, shirtDoc.id)),
    }),
    payload.create({
      collection: 'products',
      data: JSON.parse(JSON.stringify({...product2, categories: [jewelryCategory.id]})
        .replace(/{{CANDLES_IMAGE}}/g, candlesDoc.id)
      )
    }),
    payload.create({
      collection: 'products',
      data: JSON.parse(JSON.stringify({...product3, categories: [decorCategory.id]})
        .replace(/{{EARINGS_IMAGE}}/g, earingsDoc.id)
      ),
    }),
    payload.create({
      collection: 'products',
      data: JSON.parse(JSON.stringify({...product4, categories: [ebookCategory.id]})),
    }),
    payload.create({
      collection: 'products',
      data: JSON.parse(JSON.stringify({...product5, categories: [coachingCategory.id]})),
    }),
    payload.create({
      collection: 'products',
      data: JSON.parse(JSON.stringify({...product6, categories: [advancedCategory.id]})),
    })
  ]);

  const shopPageJSON = JSON.parse(JSON.stringify(shopPage)
    .replace(/{{SHIRTS_IMAGE}}/g, shirtDoc.id)
  );

  const { id: shopPageID } = await payload.create({
    collection: 'pages',
    data: shopPageJSON,
  })

  const homepageJSON = JSON.parse(JSON.stringify(home)
    .replace(/{{SHIRTS_IMAGE}}/g, shirtDoc.id)
    .replace(/{{SHOP_PAGE_ID}}/g, shopPageID)
  );

  await payload.create({
    collection: 'pages',
    data: homepageJSON,
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        {
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: shopPageID
            },
            label: 'Shop',
          }
        }
      ]
    }
  })
}
