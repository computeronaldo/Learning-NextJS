const fetchTodos = async () => {
  const res = await fetch("http://127.0.0.1:3500/todos");

  const todos: Todo[] = await res.json();

  return todos;
};

export default fetchTodos;
