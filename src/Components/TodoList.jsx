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
  const handleCheck = () => {
    const newTodoList = [...todoList];
    newTodoList[idx].isChecked = !newTodoList[idx].isChecked;
    setTodoList(newTodoList);
  };

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.isChecked}
          onChange={handleCheck}
        />
        <span>{todo.todo}</span>
      </label>
      <button data-testid="modify-button">수정</button>
      <button data-testid="delete-button" onClick={() => handleDelete(id)}>
        삭제
      </button>
    </li>
  );
};
