import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

export function SubMenu(props) {
  const [active, setActive] = useState(props.menu[0].label);

  const menuItems = props.menu.map((item, index) => 
    <Menu.Item
      eventKey={item.key}
      key={item.label}
      icon={item.icon}
    >
      <Link to={item.url}>
        {item.label}
      </Link>
    </Menu.Item>  
  )

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[active]}
      onClick={e => setActive(e.key)}
    >
      {menuItems}
    </Menu>
  );
}