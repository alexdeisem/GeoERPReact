import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/lib/locale/ru_RU';

import { AdminRoute, AuthRoute } from './Routes';
import Index from './Index';
import { LoginForm } from './LoginForm';
import { Home } from './Home';
import { Admin } from './Admin/Admin';

class App extends React.Component {
  render() {
    return (
      <ConfigProvider locale={ruRu}>
        <Switch>
          <Route exact path='/' component={ Index } />
          <Route exact path='/login' component={ LoginForm } />
          <AuthRoute path='/home' component={ Home } />
          <AdminRoute path='/admin' component={ Admin } />
          <Route path='*' component={ () => "404 NOT FOUND" } />
        </Switch>
      </ConfigProvider>
    );
  }
}

export default App;