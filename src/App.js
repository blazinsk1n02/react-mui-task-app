import Home from './components/Home'
import Navigation from './components/Navigation'
import Login from './components/Login'
import TaskDetails from './components/TaskDetails'
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
          <Route path="/taskid" component={TaskDetails} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
