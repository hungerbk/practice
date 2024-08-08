import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  //NOTE: 새로고침 시 빈 배열이 들어오는 문제 해결
  const [todoList, setTodoList] = useState(() => {
    const storedTodo = localStorage.getItem("todoList");
    return storedTodo ? JSON.parse(storedTodo) : [];
  });

  const todoRef = useRef();

  const addTodo = (todo) => {
    if (todo.trim() === "") {
      alert("Enter Todo");
      return;
    }
    const newTodo = { id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1, title: todo, done: false };
    setTodoList([...todoList, newTodo]);

    todoRef.current.value = "";
  };

  const toggleTodoDone = (id) => {
    setTodoList(todoList.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };

  const deleteTodo = (id) => {
    if (window.confirm("Do you want to delete this todo?")) {
      setTodoList(todoList.filter((todo) => todo.id !== id));
    }
  };

  //NOTE: 새로고침 시 빈 배열이 들어오는 문제 해결
  //   useLayoutEffect(() => {
  //     setTodoList(JSON.parse(localStorage.getItem("todoList")));
  //   }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="App">
      <label htmlFor="todo-input">ADD TODO</label>
      <input type="text" id="todo-input" ref={todoRef} />
      <button type="button" onClick={() => addTodo(todoRef.current.value)}>
        ADD
      </button>
      <ul>
        {todoList.length === 0 ? (
          <span>NO TODOS</span>
        ) : (
          todoList.map((todo) => (
            <li key={todo.id}>
              <input type="checkbox" name={`todo-${todo.id}`} id={todo.id} checked={todo.done} onChange={() => toggleTodoDone(todo.id)} />
              <label htmlFor={todo.id}>{todo.title}</label>
              <button type="button" onClick={() => deleteTodo(todo.id)}>
                DELETE
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
