import React, { useState } from 'react';
import './App.css';
import Weather from './components/Weather';
import TodoList from './components/TodoList';


function App() {


  return (
    <div>
      <div className="header">
       <h1>Task Timer</h1>
      <p>Get organized and stay on top of your to-do list with our user-friendly Task Timer. 
        Keep track of your tasks and mark them as complete with a click!</p>
      </div>
      <Weather/>
      <TodoList/>
    </div>

  );
}

export default App;
