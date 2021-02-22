import { Route } from 'react-router-dom';
import { Container, Content, Header } from 'rsuite';

import { Dashboard } from './Dashboard';
import { NavBar } from './NavBar';

export function Admin() {

  return (
    <div>
      <div className="card">
        <Container>
          <Header>
            <NavBar />
          </Header>
          <div style={{padding: "8px"}}>
          <Content>
            <Route path="/admin/dashboard">
              <Dashboard />
            </Route>

            <Route path="/admin/customers">
              <p>Заказчики</p>
            </Route>

            <Route path="/admin/employees">
              <p>Сотрудники</p>
            </Route>
          </Content>
          </div>
        </Container>        
      </div>
    </div>
  )
}