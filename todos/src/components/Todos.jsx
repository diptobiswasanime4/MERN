import { useEffect, useState } from "react";
import axios from "axios";

function Todos() {
  const [todo, setTodo] = useState({
    name: "",
    completed: false,
  });
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(getTodos, 5000);

    return () => clearInterval(intervalId);
  }, []);

  async function getTodos() {
    try {
      const resp = await axios.get(`http://localhost:3000/todos`);
      setTodos(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function addTodo() {
    const resp = await axios.post(`http://localhost:3000/todos`, todo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTodos(resp.data);
  }

  async function deleteTodo(t) {
    console.log(t);

    const resp = await axios.delete(`http://localhost:3000/todos/${t.Id}`);
  }
  return (
    <div className="flex flex-col items-center gap-4 my-4">
      <div className="text-3xl">Todos</div>
      <div className="flex gap-2 w-1/3">
        <input
          className="border-2 text-xl rounded w-full"
          type="text"
          placeholder="Enter Todo"
          value={todo.name}
          onChange={(e) =>
            setTodo((prevState) => ({ ...prevState, name: e.target.value }))
          }
        />
        <button
          onClick={addTodo}
          className="text-white text-xl bg-black hover:opacity-80 p-2 rounded-xl"
        >
          Add
        </button>
      </div>
      <div className="w-1/2 flex flex-col gap-2">
        {todos.map((t, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-300 rounded-xl text-xl p-2 w-full"
            >
              <div className="flex gap-2">
                <input type="checkbox" />
                <div className="">{t.name}</div>
              </div>
              <button
                onClick={() => deleteTodo(t)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todos;
