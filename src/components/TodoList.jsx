import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './todo';

function TodoList() {
  const [todos, setTodos] = useState(() => loadTodosFromLocalStorage());

  const [showClearAll, setShowClearAll] = useState(false);

  function saveTodosToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function loadTodosFromLocalStorage() {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  }

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
  
    const newTodos = [...todos, todo]; // Append the new todo to the end of the array
    setTodos(newTodos);
    saveTodosToLocalStorage(newTodos); // Save the new todos to local storage
    setShowClearAll(true); // Show the "Clear All" button when a todo is added
  
    setTodos(newTodos);
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
    saveTodosToLocalStorage(todos.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = todos.filter(todo => todo.id !== id);
    setTodos(removedArr);
    saveTodosToLocalStorage(removedArr); // Save the updated todos to local storage
  };

  const completeTodo = id => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
    ));
    saveTodosToLocalStorage(todos.map(todo =>
      todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
    ));
  };
  const clearAllTodos = () => {
    setTodos([]);
    saveTodosToLocalStorage([]);
    setShowClearAll(false);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
