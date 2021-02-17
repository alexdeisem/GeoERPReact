import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const selectAuth = state => state.auth;

const Index = () => {
  const auth = useSelector(selectAuth);
  const redirectToLogin = auth.isLoggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />;

  return (
    <div>
      {redirectToLogin}
      Index
      Is Logged In: {auth.isLoggedIn}
      Is Admin: {auth.isLoggedIn}
      Token: {auth.token}
    </div>
   )
}

export default Index;