import { AfterReadHook } from "payload/dist/globals/config/types";
import { Page, Product } from "../payload-types";

export const populateArchiveBlock: AfterReadHook = async ({ doc, req: { payload } }) => {
  // pre-populate the archive block if `populateBy` is `collection`
  // then hydrate it on your front-end

  const layoutWithArchive = await Promise.all(
    doc.layout.map(async (block) => {
      if (block.blockType === 'archive') {
        const archiveBlock = block as Extract<Page['layout'][0], { blockType: 'archive'}> & {
          populatedDocs: {
            relationTo: 'products' | 'pages'
            value: string
          }[]
        }

        if (archiveBlock.populateBy === 'collection') {
          const res: { totalDocs: number, docs: Product[] } = await payload.find({
            collection: archiveBlock.relationTo,
            limit: archiveBlock.limit || 10,
            where: {
              ...archiveBlock?.categories?.length > 0 ? {
                categories: {
                  in: archiveBlock.categories.map((cat) => {
                    if (typeof cat === 'string') return cat;
                    return cat.id
                  }).join(',')
                }
              } : {}
            },
            sort: '-publishedDate'
          })

          return {
            ...block,
            populatedDocsTotal: res.totalDocs,
            populatedDocs: res.docs.map((doc: Product) => ({
              relationTo: archiveBlock.relationTo,
              value: doc.id
            }))
          }
        }
      }

      return block
    })
  )

  return {
    ...doc,
    layout: layoutWithArchive
  }
}
