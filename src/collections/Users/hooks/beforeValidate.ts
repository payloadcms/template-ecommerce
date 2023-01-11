import { BeforeValidateHook } from "payload/dist/collections/config/types";

export const beforeValidate: BeforeValidateHook = async ({ req, data, operation }) => {
    if (operation === 'create') {
        if (req.user) {
            const sanitizedData = data;
            const isAdmin = req.user.roles.includes('admin');
            if (!isAdmin) {
                sanitizedData.roles = ['customer'];
            }
            return sanitizedData;
        }
    }
}
