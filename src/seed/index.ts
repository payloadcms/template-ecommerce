import path from 'path'
import type { Payload } from 'payload'

import { cartPage } from './cart-page'
import { courseImage } from './course'
import { ebookImage } from './ebook'
import { home } from './home'
import { product1 } from './product-1'
import { product2 } from './product-2'
import { product3 } from './product-3'
import { shirtImage } from './shirt-image'
import { shopPage } from './shop-page'

export const seed = async (payload: Payload): Promise<void> => {
  await payload.create({
    collection: 'users',
    data: {
      email: 'dev@payloadcms.com',
      name: 'Payload Dev',
      password: 'test',
      roles: ['admin'],
      stripeCustomerID: 'cus_NHipnQo3MDPVkq',
    },
  })

  const [shirtDoc, ebookDoc, courseDoc] = await Promise.all([
    payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, 'shirts.jpg'),
      data: shirtImage,
    }),
    payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, 'ebook.jpg'),
      data: ebookImage,
    }),
    payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, 'course.jpg'),
      data: courseImage,
    }),
  ])

  const [apparelCategory, ebooksCategory, coursesCategory] = await Promise.all([
    payload.create({
      collection: 'categories',
      data: {
        title: 'Apparel',
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'E-books',
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        title: 'Online courses',
      },
    }),
  ])

  Promise.all([
    payload.create({
      collection: 'products',
      data: JSON.parse(
        JSON.stringify({ ...product1, categories: [apparelCategory.id] }).replace(
          /{{SHIRTS_IMAGE}}/g,
          shirtDoc.id,
        ),
      ),
    }),
    payload.create({
      collection: 'products',
      data: JSON.parse(
        JSON.stringify({ ...product2, categories: [ebooksCategory.id] }).replace(
          /{{EBOOK_IMAGE}}/g,
          ebookDoc.id,
        ),
      ),
    }),
    payload.create({
      collection: 'products',
      data: JSON.parse(
        JSON.stringify({ ...product3, categories: [coursesCategory.id] }).replace(
          /{{COURSE_IMAGE}}/g,
          courseDoc.id,
        ),
      ),
    }),
  ])

  const shopPageJSON = JSON.parse(
    JSON.stringify(shopPage).replace(/{{SHIRTS_IMAGE}}/g, shirtDoc.id),
  )

  const { id: shopPageID } = await payload.create({
    collection: 'pages',
    data: shopPageJSON,
  })

  await payload.create({
    collection: 'pages',
    data: JSON.parse(
      JSON.stringify(home)
        .replace(/{{SHIRTS_IMAGE}}/g, shirtDoc.id)
        .replace(/{{COURSE_IMAGE}}/g, courseDoc.id)
        .replace(/{{SHOP_PAGE_ID}}/g, shopPageID),
    ),
  })

  await payload.create({
    collection: 'pages',
    data: JSON.parse(JSON.stringify(cartPage).replace(/{{SHOP_PAGE_ID}}/g, shopPageID)),
  })

  await payload.updateGlobal({
    slug: 'settings',
    data: {
      shopPage: shopPageID,
    },
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
              value: shopPageID,
            },
            label: 'Shop',
          },
        },
      ],
    },
  })
}
