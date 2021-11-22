import TaskCollection from './components/TaskCollection'
import Navigation from './components/Navigation'
import Calendar from './components/Calendar'

import './App.css';

function App() {
  return (
    <div className="App">
      <div className="main-container">
        <Navigation />
        <Calendar />
        <TaskCollection />
      </div>
    </div>
  );
}

export default App;
