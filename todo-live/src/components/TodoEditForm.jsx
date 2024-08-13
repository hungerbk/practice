import Button from "./Button";

export default function TodoEditForm({ todo, editTodoTitleRef, editTodoDescRef, checkLength, EditTodo, toggleTodoEditForm }) {
  return (
    <>
      <label htmlFor="edit-todo-title" className="a11y-hidden">
        할 일 제목 수정 입력
      </label>
      <input
        type="text"
        id="edit-todo-title"
        ref={editTodoTitleRef}
        placeholder={"할 일 제목을 입력해주세요."}
        onChange={() => checkLength("title", editTodoTitleRef.current.value, "edit")}
        defaultValue={todo.title}
      />
      <label htmlFor="edit-todo-desc" className="a11y-hidden">
        할 일 내용 수정 입력
      </label>
      <input
        type="text"
        id="edit-todo-desc"
        ref={editTodoDescRef}
        placeholder={"할 일 내용을 입력해주세요."}
        onChange={() => checkLength("desc", editTodoDescRef.current.value, "edit")}
        defaultValue={todo.desc}
      />
      <Button onClick={() => EditTodo(todo.id, editTodoTitleRef.current.value, editTodoDescRef.current.value)} text="수정" />
      <Button onClick={() => toggleTodoEditForm(todo.id)} text="취소" />
    </>
  );
}
