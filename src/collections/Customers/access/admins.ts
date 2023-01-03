import { Access } from "payload/config";

export const admins: Access = ({ req: { user } }) => user && user.collection === 'admins';