import React from 'react';
import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';

import './App.css';
import Home from './pages/Home';
import Posts from'./pages/Posts';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import MenuBar from './components/MenuBar';
import { AuthProvider } from './context/auth';
// AuthRoute is for redirecting depending on state of logged in
import AuthRoute from './util/AuthRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
          <Container>
              <MenuBar />
              <Route exact path='/' component={Home} />
              <Route exact path='/posts' component={Posts} />
              <AuthRoute exact path='/login' component={Login} />
              <AuthRoute exact path='/register' component={Register} />
              <Route exact path='/dashboard' component={Dashboard} />
          </Container>
      </Router>
    </AuthProvider>
  )
}

export default App;
