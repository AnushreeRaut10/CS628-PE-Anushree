import { useState } from 'react';
import TodoTask from './TodoTask.jsx';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');

  const addTask = () => {
    const description = taskDescription.trim();

    if (!description) {
      return;
    }

    const newTask = {
      id: Date.now(),
      description: description,
    };

    setTodos((currentTodos) => [
      ...currentTodos,
      newTask,
    ]);

    setTaskDescription('');
  };

  const deleteTask = (id) => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="todo-list">

      <div className="input-row">

        <input
          type="text"
          value={taskDescription}
          onChange={(event) =>
            setTaskDescription(event.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Enter a task..."
          aria-label="ToDo description"
        />

        <button
          type="button"
          onClick={addTask}
        >
          Add Task
        </button>

      </div>

      {todos.length === 0 ? (

        <p className="empty-message">
          No tasks yet. Add your first task!
        </p>

      ) : (

        <ul className="tasks">

          {todos.map((todo) => (
            <TodoTask
              key={todo.id}
              todo={todo}
              onDelete={deleteTask}
            />
          ))}

        </ul>

      )}

    </div>
  );
}

export default TodoList;