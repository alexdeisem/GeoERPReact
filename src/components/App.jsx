import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Index from './Index';
import LoginForm from './LoginForm/LoginForm';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Index} />
        <Route exact path='/login' component={LoginForm} />
      </Switch>
    );
  }
}

export default App;