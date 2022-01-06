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

import './App.css';

function App() {

  return (
    <Suspense fallback={<p>...Loading</p>}>
      <LocalizationProvider dateAdapter={DateAdapter}>
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
      </LocalizationProvider>
    </Suspense>
  );
}

export default App;
