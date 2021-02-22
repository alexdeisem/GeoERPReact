import { useDispatch, useSelector } from 'react-redux';
import {Dropdown, Icon} from 'rsuite';

import {logout} from '../store/auth/authActions';

export function ProfileButton(props) {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Dropdown
      title={`${user.first_name} ${user.last_name}`}
      icon={<Icon icon="avatar"/>}
      menuStyle={{width: "95%"}}
    >
      <Dropdown.Item icon={<Icon icon="home" />}>Моя страница</Dropdown.Item>
      <Dropdown.Item divider />
      <Dropdown.Item icon={<Icon icon="sign-out" />} onSelect={handleLogout}>Выйти</Dropdown.Item>
   </Dropdown>
  );
}