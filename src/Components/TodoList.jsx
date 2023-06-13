import React, { useState } from "react";
import { clientServer } from "../context/baseUrl";
import classes from "./TodoList.module.css";
const TODO_URL = "/todos";

export const TodoList = ({
  id,
  idx,
  todo,
  handleDelete,
  todoList,
  setTodoList,
}) => {
  const [modify, setModify] = useState(false);
  const [newText, setNewText] = useState("");

  const handleCheck = () => {
    const newTodoList = [...todoList];
    newTodoList[idx].isChecked = !newTodoList[idx].isChecked;
    setTodoList(newTodoList);
  };

  const handleModify = () => {
    setModify(true);
    setNewText(todo.todo);
  };

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.isChecked}
          onChange={handleCheck}
        />
        {modify ? (
          <>
            <input type="text" data-testid="modify-input" value={newText} />
          </>
        ) : (
          <>
            <span>{todo.todo}</span>
            <button data-testid="modify-button" onClick={handleModify}>
              수정
            </button>
            <button
              data-testid="delete-button"
              onClick={() => {
                handleDelete(id);
              }}
            >
              삭제
            </button>
          </>
        )}
      </label>
    </li>
  );
};
