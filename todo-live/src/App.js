import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [filteredTodoList, setFilteredTodoList] = useState([]);

  const todoTitleRef = useRef();
  const todoDescRef = useRef();

  const filterTodoList = (keyword) => {
    switch (keyword) {
      case "done":
        setFilteredTodoList(todoList.filter((todo) => todo.done === true));
        break;
      case "incomplete":
        setFilteredTodoList(todoList.filter((todo) => todo.done !== true));
        break;
      default:
        setFilteredTodoList(todoList);
        break;
    }
  };

  const checkDuplicateTitle = (title) => {
    if (todoList.filter((todo) => todo.title === title.trim()).length !== 0) {
      return false;
    } else {
      return true;
    }
  };

  const checkLength = (keyword, text) => {
    switch (keyword) {
      case "title":
        if (text.length > 50) {
          alert("제목은 50글자까지 입력할 수 있습니다!");
          todoTitleRef.current.value = text.slice(0, 51);
        }
        break;
      case "desc":
        if (text.length > 200) {
          alert("내용은 200글자까지 입력할 수 있습니다!");
          todoDescRef.current.value = text.slice(0, 201);
        }
        break;
      default:
        alert("체크할 keyword와 text를 올바르게 입력해주세요!");
        break;
    }
  };

  const changeDateFormat = (date: Date) => {
    return date.getFullYear() + "-" + (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) + "-" + date.getDate();
  };

  const addTodo = (title, desc) => {
    title = title.trim();
    desc = desc.trim();

    if (title === "") {
      alert("제목을 입력해주세요!");
      return;
    }
    if (!checkDuplicateTitle(title)) {
      alert("중복된 제목이 있습니다!");
      return;
    }

    const newTodo = { id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1, title: title, desc: desc, done: false, date: changeDateFormat(new Date()), showDetail: false };
    setTodoList([...todoList, newTodo]);

    todoTitleRef.current.value = "";
    todoDescRef.current.value = "";
  };

  const toggleShowDetailTodo = (id) => {
    setTodoList(todoList.map((todo) => (todo.id === id ? { ...todo, showDetail: !todo.showDetail } : todo)));
  };

  const deleteTodo = (id) => {
    if (window.confirm("할 일을 삭제하시겠습니까?")) {
      setTodoList(todoList.filter((todo) => todo.id !== id));
    }
  };

  const deleteTodoList = (keyword) => {
    switch (keyword) {
      case "done":
        if (window.confirm("완료한 할 일을 모두 삭제하시겠습니까?")) {
          setTodoList(todoList.filter((todo) => todo.done !== true));
        }
        break;
      default:
        if (window.confirm("할 일을 모두 삭제하시겠습니까?")) {
          setTodoList([]);
        }
        break;
    }
  };

  const toggleTodoDone = (id) => {
    setTodoList(todoList.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };

  useEffect(() => {
    setFilteredTodoList(todoList);
    console.log(todoList);
  }, [todoList]);

  return (
    <div className="App">
      <section>
        <label htmlFor="todo-input-title">할 일 제목 입력</label>
        <input type="text" id="todo-input-title" ref={todoTitleRef} placeholder={"할 일 제목을 입력해주세요."} onChange={() => checkLength("title", todoTitleRef.current.value)} />
        <label htmlFor="todo-input-desc">할 일 내용 입력</label>
        <input type="text" id="todo-input-desc" ref={todoDescRef} placeholder={"할 일 내용을 입력해주세요."} onChange={() => checkLength("title", todoDescRef.current.value)} />
        <button type="button" onClick={() => addTodo(todoTitleRef.current.value, todoDescRef.current.value)}>
          ADD
        </button>
      </section>

      <section>
        {todoList.length === 0 ? (
          <span>할 일 목록이 비어있습니다. 할 일을 등록하세요!</span>
        ) : (
          <div>
            <ul>
              <li>
                <button onClick={filterTodoList}>ALL</button>
              </li>
              <li>
                <button onClick={() => filterTodoList("done")}>DONE</button>
              </li>
              <li>
                <button onClick={() => filterTodoList("incomplete")}>INCOMPLETE</button>
              </li>
            </ul>
            <ul>
              <li>
                <button onClick={deleteTodoList}>전체 삭제</button>
              </li>
              <li>
                <button onClick={() => deleteTodoList("done")}>완료한 할 일 전체 삭제</button>
              </li>
            </ul>

            <ul>
              {filteredTodoList.map((todo) => {
                return (
                  <li key={todo.id}>
                    <input type="checkbox" name={todo.id} id={todo.id} checked={todo.done} onChange={() => toggleTodoDone(todo.id)} />
                    <label htmlFor={todo.id}>{todo.title}</label>
                    {todo.showDetail ? (
                      <button type="button" onClick={() => toggleShowDetailTodo(todo.id)}>
                        상세 닫기
                      </button>
                    ) : (
                      <button type="button" onClick={() => toggleShowDetailTodo(todo.id)}>
                        상세 보기
                      </button>
                    )}
                    <button type="button" onClick={() => deleteTodo(todo.id)}>
                      DELETE
                    </button>
                    {todo.showDetail ? (
                      <div>
                        {todo.desc}
                        <br />
                        {todo.date}
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
