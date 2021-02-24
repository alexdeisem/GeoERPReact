import React, { useState } from 'react';
import { Col, Row } from 'antd';
import { DesktopOutlined, FileTextOutlined, TagOutlined, TeamOutlined } from '@ant-design/icons';

import { Brand } from '../Brand';
import { ProfileButton } from '../ProfileButton';
import { MenuItem } from './MenuItem';
import '../../scss/NavBar.scss';

export function NavBar(props) {

  const [active, setActive] = useState('Dashboard');

  const items = [
    {
      label: 'Dashboard',
      url: '/admin/dashboard',
      icon: <DesktopOutlined />
    },
    {
      label: 'Заказчики',
      url: '/admin/customers',
      icon: <TeamOutlined />
    },
    {
      label: 'Сотрудники',
      url: '/admin/employees',
      icon: <TeamOutlined />
    },
    {
      label: 'Документы',
      url: '/admin/employees',
      icon: <FileTextOutlined />
    },
    {
      label: 'Карта',
      url: '/admin/employees',
      icon: <TagOutlined />
    },
  ]

  const menuItems = items.map((item, index) => 
    <MenuItem 
      key={index}
      label={item.label}
      url={item.url}
      icon={item.icon}
      className={item.label === active ? 'active' : ''}
      onClick={() => setActive(item.label)}
    />
  );

  return (
    <Row wrap={false} className="Navbar">
      <Col flex="none">
        <Brand />
      </Col>
      <Col flex="auto">
        {menuItems}
      </Col>
      <Col flex="none">
        <ProfileButton />
      </Col>
    </Row>
  )
}