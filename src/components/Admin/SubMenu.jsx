
import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Icon, Nav, Row } from "rsuite";

export function SubMenu(props) {
  const [active, setActive] = useState('contracts');

  const nav = props.menu.map((item, index) => 
    <Nav.Item
      componentClass={Link}
      to={item.url}
      icon={<Icon icon={item.icon}/>}
      eventKey={item.key}
      key={index}
    >
      {item.label }
    </Nav.Item>  
  )

  return (
    <div>
      <Grid fluid>
        <Row>
          <Nav appearance="subtle" activeKey={active} onSelect={key => setActive(key)}>
            {nav}
          </Nav>
        </Row>
      </Grid>
    </div>
  );
}