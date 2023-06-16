import { useQuery } from "./hooks/useQuery";

type Todo = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

function App() {
  const { data, isLoading, isError, error, refetch } = useQuery<Todo[]>(
    "https://jsonplaceholder.typicode.com/todos"
  );

  if (isLoading) {
    return <h1>...loading</h1>;
  }

  if (isError) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
        <button onClick={refetch}>try again</button>
      </div>
    );
  }

  return (
    <>
      <h1>Hello Custom Hooks</h1>
      {data &&
        data.map((todo) => (
          <div key={todo.id}>
            <h1>{todo.title}</h1>
            <h2>completed: {todo.completed}</h2>
          </div>
        ))}
    </>
  );
}

export default App;
