import Home from './components/Home'
import Navigation from './components/Navigation/Navigation'
import Login from './components/Login/Login'
import TaskDetails from './components/TaskDetails/TaskDetails'
import Register from './components/Register'

import { Route, Switch } from 'react-router-dom'

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="main-container">
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Home} />
          <Route path="/tasks/:taskId" component={TaskDetails} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
