import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskList from './components/taskList';
import TaskForm from './components/taskForm';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto">
        <Switch>
          <Route path="/add-task">
            <TaskForm />
          </Route>
          <Route path="/">
            <TaskList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

