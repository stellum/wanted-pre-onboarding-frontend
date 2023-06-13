import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodoList } from "../../Components/TodoList";
import classes from "./TodoPost.module.css";

const Todo = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const loggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (!loggedIn) navigate("/signin");
  }, []);

  const createId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const handleTodo = (e) => {
    setTodo(e.target.value);
  };

  const onCreatePost = () => {
    const obj = {
      id: createId(),
      todo: todo,
      isChecked: false,
    };

    setTodoList([obj, ...todoList]);
    setTodo("");
  };

  return (
    <>
      <header className={classes.header}>
        <h1>Todo 게시판</h1>
        <div className={classes.container}>
          <input
            className={classes.input}
            data-testid="new-todo-input"
            value={todo}
            onChange={handleTodo}
          />
          <button
            className={classes.button}
            onClick={onCreatePost}
            data-testid="new-todo-add-button"
          >
            추가
          </button>
        </div>
      </header>

      {todoList.map((todo, idx) => {
        return (
          <>
            <TodoList
              id={todo.id}
              idx={idx}
              todo={todo}
              todoList={todoList}
              setTodoList={setTodoList}
            />
          </>
        );
      })}
    </>
  );
};

export default Todo;
