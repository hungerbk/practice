import React from "react";
import Button from "./Button";

export function FilterButtonList({ filterTodoList }) {
  return (
    <ul className="button-list">
      <li>
        <Button onClick={() => filterTodoList()} text="All" />
      </li>
      <li>
        <Button onClick={() => filterTodoList("done")} text="DONE" />
      </li>
      <li>
        <Button onClick={() => filterTodoList("incomplete")} text="INCOMPLETE" />
      </li>
    </ul>
  );
}

export function DeleteButtonList({ deleteTodoList }) {
  return (
    <ul className="button-list">
      <li>
        <Button onClick={() => deleteTodoList()} text="전체 삭제" />
      </li>
      <li>
        <Button onClick={() => deleteTodoList("done")} text="완료한 할 일 전체 삭제" />
      </li>
    </ul>
  );
}
