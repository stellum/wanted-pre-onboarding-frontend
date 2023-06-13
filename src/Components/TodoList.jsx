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

  const handleModifyInput = (e) => {
    setNewText(e.target.value);
  };

  const handleModifySubmit = async (id) => {
    const newTodoList = [...todoList];
    newTodoList[idx].todo = newText;
    setTodoList(newTodoList);
    setModify(false);

    try {
      const token = localStorage.getItem("token");
      await clientServer.put(
        `${TODO_URL}/${id}`,
        {
          todo: newText,
          isCompleted: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setNewText(todo.todo);
    setModify(false);
  };

  return (
    <li className={classes.li}>
      <label>
        <input type="checkbox" value={todo.isCompleted} onClick={handleCheck} />
        {modify ? (
          <>
            <input
              className={classes.input}
              type="text"
              data-testid="modify-input"
              value={newText}
              onChange={handleModifyInput}
            />
            <button
              className={classes.btn}
              data-testid="submit-button"
              onClick={() => handleModifySubmit(id)}
            >
              제출
            </button>
            <button
              className={classes.btn}
              data-testid="cancel-button"
              onClick={handleCancel}
            >
              취소
            </button>
          </>
        ) : (
          <>
            <span>{todo.todo}</span>

            <button
              data-testid="modify-button"
              onClick={handleModify}
              className={classes.btn}
            >
              수정
            </button>
            <button
              className={classes.btn}
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
