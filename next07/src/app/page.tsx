import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

// This is a route segment configuration.
// This allows us to configure behaviour of a page
// by exporting revalidate variable.

// This is used to set revalidation time for a page
// Setting this variable to 0 ensures this page is always
// dynamically rendered.

// This option changes the default of fetch requests that do not set a cache option to 'no-store' but leaves fetch requests that opt into 'force-cache' or use a positive revalidate as is.

export const revalidate = 0;

export default function Home() {
  return (
    <>
      <AddTodo />
      <TodoList />
    </>
  );
}
