import AuthListener from './AuthListener';
import PermissionListener from './PermissionListener';
import RoleListener from './RoleListener';
import UserListener from './UserListener';

export default async function initListeners() {
  const authlistener = new AuthListener();
  const userlistener = new UserListener();
  const rolelistener = new RoleListener();
  const permissionlistener = new PermissionListener();
}
