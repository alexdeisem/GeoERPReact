import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const selectAuth = state => state.auth;

const Index = () => {
  const auth = useSelector(selectAuth);
  const redirectToLogin = auth.isLoggedIn ? <Redirect to="/admin/dashboard/contracts" /> : <Redirect to="/login" />;

  return (
    <div>
      { redirectToLogin }
    </div>
   )
}

export default Index;