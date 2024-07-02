import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Todo = () => {
  const [userTodos, setUserTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchUserTodos();
  }, []);

  const fetchUserTodos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos?userId=1');
      const sortedTodos = response.data.sort((a, b) => a.title.localeCompare(b.title));
      setUserTodos(sortedTodos);
    } catch (error) {
      console.error('Error fetching user todos:', error);
    }
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTodo = {
        id: Math.random(),
        title: newTask,
        completed: false
      };
      setUserTodos([...userTodos, newTodo]);
      setNewTask('');
    }
  };

  const markAsDone = (id) => {
    const updatedTodos = userTodos.map(todo =>
      todo.id === id ? { ...todo, completed: true } : todo
    );
    setUserTodos(updatedTodos);
  };

  const deleteTask = (id) => {
    const updatedTodos = userTodos.filter(todo => todo.id !== id);
    setUserTodos(updatedTodos);
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="todo-list">
        {userTodos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'done' : ''}>
            <span>{todo.title}</span>
            <div>
              {!todo.completed && <button onClick={() => markAsDone(todo.id)}>Mark Done</button>}
              <button onClick={() => deleteTask(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
