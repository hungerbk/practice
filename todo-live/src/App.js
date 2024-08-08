import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);

  const todoTitleRef = useRef();
  const todoDescRef = useRef();

  const addTodo = (title, desc) => {
    if (title.trim() === "") {
      alert("제목을 입력해주세요!");
      return;
    }
    const newTodo = { id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1, title: title, desc: desc, done: false };
    setTodoList([...todoList, newTodo]);

    todoTitleRef.current.value = "";
    todoDescRef.current.value = "";
  };

  const deleteTodo = (id) => {
    if (window.confirm("할 일을 삭제하시겠습니까?")) {
      setTodoList(todoList.filter((todo) => todo.id !== id));
    }
  };

  const toggleTodoDone = (id) => {
    setTodoList(todoList.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  return (
    <div className="App">
      <section>
        <label htmlFor="todo-input-title">할 일 제목 입력</label>
        <input type="text" id="todo-input-title" ref={todoTitleRef} placeholder={"할 일 제목을 입력해주세요."} />
        <label htmlFor="todo-input-desc">할 일 내용 입력</label>
        <input type="text" id="todo-input-desc" ref={todoDescRef} placeholder={"할 일 내용을 입력해주세요."} />
        <button type="button" onClick={() => addTodo(todoTitleRef.current.value, todoDescRef.current.value)}>
          ADD
        </button>
      </section>

      {todoList.length === 0 ? (
        <span>할 일 목록이 비어있습니다. 할 일을 등록하세요!</span>
      ) : (
        <ul>
          {todoList.map((todo) => {
            return (
              <li key={todo.id}>
                <input type="checkbox" name={todo.id} id={todo.id} checked={todo.done} onChange={() => toggleTodoDone(todo.id)} />
                <label htmlFor={todo.id}>{todo.title}</label>
                <button type="button" onClick={() => deleteTodo(todo.id)}>
                  DELETE
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
