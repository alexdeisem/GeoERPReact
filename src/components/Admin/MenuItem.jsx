import { Link } from 'react-router-dom';
import { Button } from 'antd';

export function MenuItem(props) {
  return (
    <Button
      className={`NavbarItem ${props.className}`} 
      type="text"
      icon={props.icon}
      onClick={props.onClick}
    >
      <Link to={props.url}>
        {props.label}
      </Link>
    </Button>
  );
};