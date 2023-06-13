import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTodos } from "../../Components/TodoList";

const Todo = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const loggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (!loggedIn) navigate("/signin");
  }, []);

  useEffect(() => {
    getTodos().then((res) => {
      setTodo(res.data);
    });
  }, []);

  if (todo.length === 0) return <div>todo is empty :( </div>;

  return (
    <>
      {todoList.map((todo, idx) => {
        return (
          <>
            <li key={idx}>
              <label>
                <input type="checkbox" />
                <span>TODO 1</span>
              </label>
            </li>
          </>
        );
      })}
    </>
  );
};

export default Todo;
