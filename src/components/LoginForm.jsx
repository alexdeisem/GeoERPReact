import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { Logo } from'./Logo';
import { login } from '../store/auth/authActions';
import '../scss/Login.scss';

export function LoginForm(props) {
  const dispatch = useDispatch();

  const handleSubmit = values => {
    if (!values) {
      return;
    }
    dispatch(
      login(values)
    ).then((isAdmin) => {
      if (isAdmin) {
        props.history.push('/admin/dashboard');
      } else {
        props.history.push('/home');
      }
    });
  }

  const required =  {
    required: true,
    message: 'Поле не может быть  пустым'
  };

  return (
    <div className="LoginContainer">
      <Form
        name="login"
        className="Login"
        onFinish={ values => handleSubmit(values) }
      >
       <Logo fontSize="64px" weight="200" className="Logo" />
        <Form.Item
          name="username"
          rules={[required]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Логин"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[required]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="LoginBtn">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};