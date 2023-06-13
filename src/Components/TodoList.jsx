import { clientServer } from "../context/baseUrl";
import classes from "./TodoList.module.css";
const TODO_URL = "/todos";

export const TodoList = ({ todoInput }) => {
  return (
    <li className={classes.container}>
      <input type="checkbox" />
      <span>{todoInput}</span>
    </li>
  );
};
