import React from 'react';
import {Route} from 'react-router';
import App from 'views/App';
import MoviesPage from 'components/moviesPage';
import SignUp from 'views/SignUp';
import Login from 'views/Login';

export default (
  <Route component={App}>
    <Route path="/" component={MoviesPage}/>
    <Route path="/sign-up" component={SignUp}/>
    <Route path="/login" component={Login}/>
  </Route>
);
