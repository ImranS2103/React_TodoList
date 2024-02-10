import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import Design from './components/Design'

function App() {
  return (
    <div className='todo-app'>
      {/* <Design /> */}
      <TodoList />
    </div>
  );
}

export default App;