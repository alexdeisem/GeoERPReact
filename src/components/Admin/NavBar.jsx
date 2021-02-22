import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Icon, Nav, Navbar } from 'rsuite';

import {ProfileButton} from '../ProfileButton';
import '../../scss/NavBar.scss';

export function NavBar(props) {
  const [active, setActive] = useState('dashboard');

  const items = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      url: '/admin/dashboard',
      icon: 'dashboard'
    },
    {
      key: 'customers',
      label: 'Заказчики',
      url: '/admin/customers',
      icon: 'peoples-map'
    },
    {
      key: 'employees',
      label: 'Сотрудники',
      url: '/admin/employees',
      icon: 'peoples'
    },
    {
      key: 'documents',
      label: 'Документы',
      url: '/admin/employees',
      icon: 'file-o'
    },
    {
      key: 'map',
      label: 'Карта',
      url: '/admin/employees',
      icon: 'map-o'
    },
  ]

  const menuItems = items.map((item, index) => 
    <Nav.Item
      key={index}
      eventKey={item.key}
      componentClass={Link}
      to={item.url}
      icon={<Icon icon={item.icon}/>}
      className={active === item.key ? 'ActiveLink' : ''}
    >
      {item.label}
    </Nav.Item>
  );

  return (
    <div>
      <Navbar appearance="inverse">
        <Navbar.Header>
          <Link to="/admin/dashboard" className="NavbarBrand UndecoratedLink">
            GeoERP
          </Link>
        </Navbar.Header>
        <Navbar.Body>
            <Nav activeKey={active} onSelect={item => setActive(item)}>
              {menuItems}
            </Nav>
            <Nav pullRight>
              <ProfileButton />
            </Nav>
          </Navbar.Body>
      </Navbar>
    </div>
  )
}