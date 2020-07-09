import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Homepage from './components/Homepage/Homepage';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </>
  );
}

export default App;
