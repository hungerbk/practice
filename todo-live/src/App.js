import "./App.css";
import { useState, useRef, useEffect } from "react";
import { changeDateFormat } from "./utils";
import TodoListItem from "./components/TodoListItem";
import { DeleteButtonList, FilterButtonList } from "./components/ButtonList";
import TodoInput from "./components/TodoInput";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [filteredTodoList, setFilteredTodoList] = useState([]);

  const todoTitleRef = useRef();
  const todoDescRef = useRef();

  const editTodoTitleRef = useRef();
  const editTodoDescRef = useRef();

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

  const checkDuplicateTitle = (title, id) => {
    if (id && todoList.filter((todo) => todo.id !== id && todo.title === title.trim()).length !== 0) {
      return false;
    } else if (!id && todoList.filter((todo) => todo.title === title.trim()).length !== 0) {
      return false;
    } else {
      return true;
    }
  };

  const checkLength = (keyword, text, edit) => {
    switch (keyword) {
      case "title":
        if (text.length > 50) {
          alert("제목은 50글자까지 입력할 수 있습니다!");
          if (edit) {
            editTodoTitleRef.current.value = text.slice(0, 51);
          } else {
            todoTitleRef.current.value = text.slice(0, 51);
          }
        }
        break;
      case "desc":
        if (text.length > 200) {
          alert("내용은 200글자까지 입력할 수 있습니다!");
          if (edit) {
            editTodoDescRef.current.value = text.slice(0, 201);
          } else {
            todoDescRef.current.value = text.slice(0, 201);
          }
        }
        break;
      default:
        alert("체크할 keyword와 text를 올바르게 입력해주세요!");
        break;
    }
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

    const newTodo = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      title: title,
      desc: desc,
      done: false,
      createdDate: changeDateFormat(new Date()),
      updatedDate: changeDateFormat(new Date()),
      showDetail: false,
      onEdit: false,
    };
    setTodoList([...todoList, newTodo]);

    todoTitleRef.current.value = "";
    todoDescRef.current.value = "";
  };

  const toggleTodoShowDetail = (id) => {
    setTodoList(todoList.map((todo) => (todo.id === id ? { ...todo, showDetail: !todo.showDetail } : todo)));
  };

  const toggleTodoEditForm = (id) => {
    setTodoList(todoList.map((todo) => (todo.id === id ? { ...todo, onEdit: !todo.onEdit } : { ...todo, onEdit: false })));
  };

  const EditTodo = (id, title, desc) => {
    title = title.trim();
    desc = desc.trim();

    if (window.confirm("수정하시겠습니까?")) {
      if (title === "") {
        alert("제목을 입력해주세요!");
        return;
      }
      if (!checkDuplicateTitle(title, id)) {
        alert("중복된 제목이 있습니다!");
        return;
      }

      setTodoList(todoList.map((todo) => (todo.id === id ? { ...todo, title: title, desc: desc, updatedDate: changeDateFormat(new Date()), onEdit: false } : todo)));
    }
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
  }, [todoList]);

  return (
    <div className="App">
      <h1>TODOLIST</h1>
      <TodoInput checkLength={checkLength} addTodo={addTodo} todoTitleRef={todoTitleRef} todoDescRef={todoDescRef} />
      <section>
        {todoList.length === 0 ? (
          <span>할 일 목록이 비어있습니다. 할 일을 등록하세요!</span>
        ) : (
          <div>
            <section className="button-list-section">
              <FilterButtonList filterTodoList={filterTodoList} />
              <DeleteButtonList deleteTodoList={deleteTodoList} />
            </section>

            <ul>
              {filteredTodoList.map((todo) => {
                return (
                  <TodoListItem
                    key={todo.id}
                    todo={todo}
                    checkLength={checkLength}
                    EditTodo={EditTodo}
                    toggleTodoShowDetail={toggleTodoShowDetail}
                    toggleTodoEditForm={toggleTodoEditForm}
                    deleteTodo={deleteTodo}
                    toggleTodoDone={toggleTodoDone}
                    editTodoTitleRef={editTodoTitleRef}
                    editTodoDescRef={editTodoDescRef}
                  />
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
