import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, Menu } from 'antd';
import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

import {logout} from '../store/auth/authActions';

export function ProfileButton(props) {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const menu = (
    <Menu style={{width: "95%"}}>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        Моя страница
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<LogoutOutlined />}
        onClick={ () => handleLogout() }
      >
        Выход
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown className="ProfileBtn" overlay={menu} trigger="click">
      <Button type="text" icon={<UserOutlined />}>
        {`${user.first_name} ${user.last_name}`}
      </Button>
   </Dropdown>
  );
}