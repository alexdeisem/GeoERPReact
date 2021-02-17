import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import Logo from'../Logo/Logo';
import ValidationError from '../ValidationError/ValidatinError';
import './Login.scss';
import { login } from '../../store/auth/authActions';
import { useInput } from '../../helpers/hooks';

function LoginForm(props) {
  const username = useInput('', {required: true, minLength: 2, maxLength: 50});
  const password = useInput('', {required: true, minLength: 8, maxLength: 50});
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      login({
        username: username.value,
        password: password.value
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
    <div className="LoginContainer" onSubmit={ handleSubmit }>
      <form className="Login p-shadow-10">

        <Logo fontSize="64px" />

        <div className="p-field p-grid p-pt-2">
          <label htmlFor="username" className="p-col-fixed loginLabelWidth">Логин</label>
          <div className="p-col">
            <InputText
              id="username"
              type="text"
              name="username"
              autoComplete="off"
              className="loginInputWidth"
              value={ username.value }
              onChange={ e => username.onChange(e) }
              onBlur={ e => username.onBlur(e) }
            />
            {username.isDirty && <ValidationError errors={ username.errors } />}
          </div>
        </div>

        <div className="p-field p-grid">
          <label htmlFor="password" className="p-col-fixed loginLabelWidth">Пароль</label>
          <div className="p-col">
            <InputText
              id="password"
              type="password"
              name="password"
              autoComplete="password"
              className="loginInputWidth"
              value={ password.value }
              onChange={ e => password.onChange(e) }
              onBlur={ e => password.onBlur(e) }
            />
             {password.isDirty && <ValidationError errors={ password.errors } />}
          </div>
        </div>

        <div className="p-grid p-justify-end">
          <Button label="Войти" className="LoginBtn p-col-4" disabled={ !!password.errors.length || !!username.errors.length }/>
        </div>

      </form>
    </div>
  );
};

export default LoginForm;