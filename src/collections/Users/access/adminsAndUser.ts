import checkRole from '../checkRole';

const adminsAndUser = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true;
    }

    return {
      id: user.id,
    };
  }

  return false;
};

export default adminsAndUser;
