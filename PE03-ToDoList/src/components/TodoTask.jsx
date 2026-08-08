function TodoTask({ todo, onDelete }) {
  return (
    <li className="task">

      <span>
        {todo.description}
      </span>

      <button
        type="button"
        className="delete-button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete ${todo.description}`}
      >
        Delete
      </button>

    </li>
  );
}

export default TodoTask;