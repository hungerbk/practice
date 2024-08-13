import Button from "./Button";
import TodoEditForm from "./TodoEditForm";

export default function TodoListItem({ todo, checkLength, EditTodo, toggleTodoShowDetail, toggleTodoEditForm, deleteTodo, toggleTodoDone, editTodoTitleRef, editTodoDescRef }) {
  return (
    <li className="todo-list-item">
      {todo.onEdit ? (
        <TodoEditForm todo={todo} editTodoTitleRef={editTodoTitleRef} editTodoDescRef={editTodoDescRef} checkLength={checkLength} EditTodo={EditTodo} toggleTodoEditForm={toggleTodoEditForm} />
      ) : (
        <>
          <input type="checkbox" name={todo.id} id={todo.id} checked={todo.done} onChange={() => toggleTodoDone(todo.id)} />
          <label htmlFor={todo.id}>{todo.title}</label>
          {todo.showDetail ? <Button onClick={() => toggleTodoShowDetail(todo.id)} text="상세 닫기" /> : <Button onClick={() => toggleTodoShowDetail(todo.id)} text="상세 보기" />}
          <Button onClick={() => toggleTodoEditForm(todo.id)} text="EDIT" />
          <Button onClick={() => deleteTodo(todo.id)} text="DELETE" />
          {todo.showDetail ? (
            <div className="todo-detail">
              {todo.desc.length > 0 ? todo.desc : "상세 내용이 없습니다."}
              <br />
              <span>등록일: </span>
              {todo.createdDate}
              <br />
              <span>수정일: </span>
              {todo.updatedDate}
            </div>
          ) : null}
        </>
      )}
    </li>
  );
}
