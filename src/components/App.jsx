import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { IntlProvider } from 'react-intl';
import LocaleProvider from 'rsuite/lib/IntlProvider';
import ru_RU from 'rsuite/lib/IntlProvider/locales/ru_RU';

import { AdminRoute, AuthRoute } from './Routes';
import Index from './Index';
import { LoginForm } from './LoginForm';
import { Home } from './Home';
import { Admin } from './Admin/Admin';

class App extends React.Component {
  render() {
    return (
      <IntlProvider locale="zh">
        <LocaleProvider locale={ru_RU}>
          <Switch>
            <Route exact path='/' component={ Index } />
            <Route exact path='/login' component={ LoginForm } />
            <AuthRoute path='/home' component={ Home } />
            <AdminRoute path='/admin' component={ Admin } />
            <Route path='*' component={ () => "404 NOT FOUND" } />
          </Switch>
        </LocaleProvider>
      </IntlProvider>
    );
  }
}

export default App;