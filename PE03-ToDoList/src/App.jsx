import TodoList from './components/TodoList.jsx';

function App() {
  return (
    <main className="app">
      <section className="todo-card">
        <h1>ToDo List</h1>

        <p className="subtitle">
          CS628 Programming Exercise 03
        </p>

        <TodoList />
      </section>
    </main>
  );
}

export default App;