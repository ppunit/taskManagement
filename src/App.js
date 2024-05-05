import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/feature/taskList';
import TaskForm from './components/feature/taskForm';
import Layout from './layout';
import './App.css';

const App = () => {
  return (
    <Layout>
      <Router>
        <div className="max-w-full p-4 " role="application">
          <nav aria-label="Main navigation">
            <Routes>
              <Route path="/add-task" element={<TaskForm />} />
              <Route path="/" exact element={<TaskList />} />
            </Routes>
          </nav>
        </div>
      </Router>
    </Layout>
  );
};

export default App;

