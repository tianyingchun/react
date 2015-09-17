import React from 'react';
import { Route, Redirect } from 'react-router';
import Header from '../components/Header';
import NoMatch from '../components/NoMatch';
import Member from '../views/Member';
import WsList from '../views/WsList';
export default function () {
  return (
    <Route component={ Header }>
      <Route path='/(docs)' component={ WsList } />
      <Route path='/docs/:id/' component={ Member } />
      <Redirect from="/" to="/docs" />
      <Route path="*" component={ NoMatch }/>
    </Route>
  );
}
