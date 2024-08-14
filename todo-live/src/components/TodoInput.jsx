import Button from "./Button";

export default function TodoInput({ checkLength, addTodo, todoTitleRef, todoDescRef }) {
  return (
    <section className="todo-input-section">
      <label htmlFor="todo-input-title" className="a11y-hidden">
        할 일 제목 입력
      </label>
      <input
        type="text"
        id="todo-input-title"
        className="todo-input"
        ref={todoTitleRef}
        placeholder={"할 일 제목을 입력해주세요. (50글자 이내)"}
        onChange={() => checkLength("title", todoTitleRef.current.value)}
      />
      <label htmlFor="todo-input-desc" className="a11y-hidden">
        할 일 내용 입력
      </label>
      <input
        type="text"
        id="todo-input-desc"
        className="todo-input"
        ref={todoDescRef}
        placeholder={"할 일 내용을 입력해주세요. (200글자 이내)"}
        onChange={() => checkLength("desc", todoDescRef.current.value)}
      />
      <Button onClick={() => addTodo(todoTitleRef.current.value, todoDescRef.current.value)} text={"ADD"} />
    </section>
  );
}
