import { SnackbarProvider } from 'notistack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import { Suspense } from "react";

import Home from './components/Home'
import Navigation from './components/Navigation/Navigation'
import Login from './components/Login/Login'
import Logout from './components/Logout';
import TaskDetails from './components/TaskDetails/TaskDetails'
import Register from './components/Register/Register'

import { Route, Switch } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react';
import { AuthContext } from './contexts/AuthContext';

import './App.css';
import { supabase } from './lib/supabaseClient';

const initialAuthState = {
  id: '',
  email: '',
  role: ''
};

function App() {
  const [user, setUser] = useState(initialAuthState);

  useEffect(() => {
    initUser();
  }, []);

  // Initialize the user based on the stored session
  const initUser = useCallback(async () => {
    const session = supabase.auth.session();
    await supabase.auth.signIn({
      refreshToken: session?.refresh_token,
    });
    const userData = supabase.auth.user()
    if (userData) {
      login(userData);
    }
  }, []);

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
    <Suspense fallback={<p>...Loading</p>}>
      <LocalizationProvider dateAdapter={DateAdapter}>
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
      </LocalizationProvider>
    </Suspense>
  );
}

export default App;
