import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  Button,
  ButtonToolbar,
  ControlLabel,
  Form, 
  FormControl,
  FormGroup,
  Panel,
  Schema
} from 'rsuite';

import { Logo } from'./Logo';
import { login } from '../store/auth/authActions';
import '../scss/Login.scss';

export function LoginForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const { StringType } = Schema.Types;

  const model = Schema.Model({
    username: StringType()
      .isRequired('Поле не может быть пустым')
      .minLength(2, 'Логин не может быть короче 2 символов')
      .maxLength(50, 'Логин не может быть длинее 50 символов'),
    password: StringType()
      .isRequired('Поле не может быть пустым')
      .minLength(8, 'Пароль не может быть короче 8 символов')
      .maxLength(50, 'Пароль не может быть длинее 50 символов'),
  });

  const handleSubmit = valid => {
    if (!valid) {
      return;
    }

    dispatch(
      login({
        username: username,
        password: password
      })
    ).then((isAdmin) => {
      if (isAdmin) {
        props.history.push('/admin/dashboard');
      } else {
        props.history.push('/home');
      }
    });
  }

  return (
    <div className="LoginContainer">
      <div className="Login">
        <Panel header={ <Logo fontSize="48px" weight="400"/>} bordered>
          <Form model={model} fluid onSubmit={valid => handleSubmit(valid)}>
            <FormGroup>
              <ControlLabel>Логин</ControlLabel>
              <FormControl
                name="username"
                autoComplete="off"
                value={ username }
                onChange={ value => setUsername(value) }
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Пароль</ControlLabel>
              <FormControl
              type="password"
              name="password"
              autoComplete="password"
              value={ password }
              onChange={ value => setPassword(value) }
              />
            </FormGroup>
            <FormGroup>
              <ButtonToolbar>
                <Button appearance="primary" type="submit" className="LoginBtn">Войти</Button>
              </ButtonToolbar>
            </FormGroup>
          </Form>
        </Panel>
      </div>
    </div>
  );
};