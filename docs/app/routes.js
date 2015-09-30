import React from 'react';
import { Route, Redirect } from 'react-router';
import NoMatch from '../components/NoMatch';
import DocLayout from '../components/DocLayout';
import Home from '../views/Home';
import ReactDocLayout from '../views/ReactDocLayout';
import LessDocLayout from '../views/LessDocLayout';

export default function () {
  return (
    <Route component={ DocLayout }>
      <Route path='/(docs)' component={ Home } />
      <Route path='/(docs)/less(/:component)' component={ LessDocLayout } />
      <Route path='/(docs)/react(/:group)(/:component)(/:target)' component={ ReactDocLayout } />
      <Redirect from="/" to="/docs" />
      <Route path="*" component={ NoMatch } />
    </Route>
  );
}
