import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';

import Dashboard from '../pages/Dashboard';

const Routes: React.FC = ( ) => {
  return(
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/reset" component={ResetPassword} />
      <Route path="/greetings" component={Greetings} />

      <Route path="/profile" component={Profile}  />
      <Route path="/dashboard" component={Dashboard}  />
    </Switch>
);
};

export default Routes;
