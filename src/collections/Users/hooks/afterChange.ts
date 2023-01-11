import { AfterChangeHook } from "payload/dist/collections/config/types";

export const afterChange: AfterChangeHook = async ({
  doc,
  req,
  req: {
    payload,
    body = {},
    res,
  }, operation,
}) => {
  if (operation === 'create') {
    const { email, password } = body;

    if (email && password) {
      const { user, token } = await payload.login({
        collection: 'users',
        data: { email, password },
        req,
        res,
      });

      return {
        ...doc,
        token,
        user,
      };
    }
  }

  return doc;
}
