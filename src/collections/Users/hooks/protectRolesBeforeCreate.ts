import { BeforeValidateHook } from "payload/dist/collections/config/types";
import { FieldHook } from "payload/types";

export const protectRolesBeforeCreate: FieldHook = async ({ req, data, operation }) => {
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
