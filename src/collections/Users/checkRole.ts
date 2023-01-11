import { User } from "../../payload-types";

const checkRole = (allRoles: User['roles'] = [], user: User) => {
  if (user) {
    if (allRoles.some((role) => {
      return user.roles && user.roles.some((individualRole) => {
        return individualRole === role;
      });
    }))

    return true;
  }

  return false;
};

export default checkRole;
