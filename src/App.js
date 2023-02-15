import React, { useState } from 'react';
import './App.css';
import Weather from './components/Weather';
import TodoList from './components/TodoList';


function App() {


  return (
    <div>
    <Weather/>
    <TodoList/>
    </div>

  );
}

export default App;
