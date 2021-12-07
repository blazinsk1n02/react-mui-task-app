import { SnackbarProvider } from 'notistack';

import Home from './components/Home'
import Navigation from './components/Navigation/Navigation'
import Login from './components/Login/Login'
import Logout from './components/Logout';
import TaskDetails from './components/TaskDetails/TaskDetails'
import Register from './components/Register/Register'

import { Route, Switch } from 'react-router-dom'
import { useState } from 'react';
import { AuthContext } from './contexts/AuthContext';

import './App.css';

const initialAuthState = {
  id: '',
  email: '',
  role: ''
};

function App() {
  const [user, setUser] = useState(initialAuthState);

  const login = (userData) => {
    setUser({
      ...user,
      id: userData.id,
      email: userData.email,
      role: userData.role
    });
  };

  const logout = () => {
    setUser(initialAuthState);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <SnackbarProvider maxSnack={3} hideIconVariant>
        <div className="App">
          <div className="main-container">
            <Navigation />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/logout" component={Logout} />
              <Route path="/tasks/:taskId" component={TaskDetails} />
            </Switch>
          </div>
        </div>
      </SnackbarProvider>
    </AuthContext.Provider>
  );
}

export default App;
