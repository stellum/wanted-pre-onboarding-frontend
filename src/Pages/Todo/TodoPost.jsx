import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodoList } from "../../Components/TodoList";
import classes from "./TodoPost.module.css";
import { clientServer } from "../../context/baseUrl";
const TODO_URL = "/todos";

const Todo = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");
  const deserializedTodoList =
    JSON.parse(localStorage.getItem("todoList")) || [];
  const [todoList, setTodoList] = useState(deserializedTodoList);

  const loggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (!loggedIn) navigate("/signin");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const response = await clientServer.get(TODO_URL, { headers });
        setTodoList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const createId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const handleTodo = (e) => {
    setTodo(e.target.value);
  };

  const onCreatePost = async () => {
    const obj = {
      id: createId(),
      todo: todo,
      isCompleted: false,
      userId: createId(),
    };

    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await clientServer.post(TODO_URL, obj, { headers });
      setTodoList([...todoList, response.data]);
    } catch (error) {
      console.log(error.response.data);
    }
    setTodo("");
    let serializedTodoList = JSON.stringify([...todoList, obj]);
    localStorage.setItem("todoList", serializedTodoList);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }
      await clientServer.delete(`${TODO_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const x = todoList.filter((input) => input.id !== id);
      setTodoList(x);
      let serializedTodoList = JSON.stringify(x);
      localStorage.setItem("todoList", serializedTodoList);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div className={classes.parentContainer}>
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

        <div className={classes.list}>
          {todoList.map((todo, idx) => {
            return (
              <>
                <TodoList
                  id={todo.id}
                  idx={idx}
                  todo={todo}
                  todoList={todoList}
                  setTodoList={setTodoList}
                  handleDelete={handleDelete}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Todo;
