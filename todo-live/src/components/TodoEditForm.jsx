import Button from "./Button";

export default function TodoEditForm({ todo, editTodoTitleRef, editTodoDescRef, checkLength, EditTodo, toggleTodoEditForm }) {
  return (
    <div className="todo-input-section">
      <label htmlFor="edit-todo-title" className="a11y-hidden">
        할 일 제목 수정 입력
      </label>
      <input
        type="text"
        id="edit-todo-title"
        className="todo-input"
        ref={editTodoTitleRef}
        placeholder={"할 일 제목을 입력해주세요. (50글자 이내)"}
        onChange={() => checkLength("title", editTodoTitleRef.current.value, "edit")}
        defaultValue={todo.title}
      />
      <label htmlFor="edit-todo-desc" className="a11y-hidden">
        할 일 내용 수정 입력
      </label>
      <input
        type="text"
        id="edit-todo-desc"
        className="todo-input"
        ref={editTodoDescRef}
        placeholder={"할 일 내용을 입력해주세요. (200글자 이내)"}
        onChange={() => checkLength("desc", editTodoDescRef.current.value, "edit")}
        defaultValue={todo.desc}
      />
      <span className="todo-edit-form-button-list">
        <Button onClick={() => EditTodo(todo.id, editTodoTitleRef.current.value, editTodoDescRef.current.value)} text="수정" />
        <Button onClick={() => toggleTodoEditForm(todo.id)} text="취소" />
      </span>
    </div>
  );
}
