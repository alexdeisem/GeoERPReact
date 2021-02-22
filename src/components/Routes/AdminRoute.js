import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { authentification } from '../../store/auth/authSelectors';

export const AdminRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(authentification);
  const isAuth = auth.isLoggedIn && !!auth.token;
  const isAdmin = auth.isAdmin;

  return (
    <Route
      { ...rest }
      render={ props => {
        if (isAuth && isAdmin) {
          return <Component {...props} />;
        } 
        else {
          return <Redirect to={
            {
              pathname: '/login',
              state: {
                from: props.location
              }
            }
          } />
        }
      }}
    />
  );
};