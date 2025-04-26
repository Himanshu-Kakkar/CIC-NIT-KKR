import React, { useState } from 'react';
import './todo.css'

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value) return; // Don't add empty todo
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        placeholder="Add todo..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button className="button">Add</button>
    </form>
  );
}

export default TodoForm;
