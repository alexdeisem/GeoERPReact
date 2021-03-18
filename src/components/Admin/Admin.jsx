import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import {
  subscribeChannelEvent,
  update,
} from 'store/contracts/contractsActions';
import { Dashboard } from './Dashboard';
import { Settings } from './Settings';
import { NavBar } from './NavBar';

export function Admin() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(subscribeChannelEvent('ContractUpdated', (e) => dispatch(update(e.contract))));
  }, [dispatch]);

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

        <Route path="/admin/settings">
          <Settings />
        </Route>
      </div>
    </div>       
  );
};