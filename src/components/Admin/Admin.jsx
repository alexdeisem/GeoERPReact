import { Route } from 'react-router-dom';

import { Dashboard } from './Dashboard';
import { NavBar } from './NavBar';

export function Admin() {

  return (
    <div>
      <NavBar />
      <div className="Content">
        <Route path="/admin/dashboard">
          <Dashboard />
        </Route>

        <Route path="/admin/customers">
          <p>Заказчики</p>
        </Route>

        <Route path="/admin/employees">
          <p>Сотрудники</p>
        </Route>
      </div>
    </div>       
  );
};