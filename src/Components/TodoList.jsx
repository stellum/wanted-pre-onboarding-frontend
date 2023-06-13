import { clientServer } from "../context/baseUrl";
const TODO_URL = "/todos";

export const getTodos = async () => {
  return await clientServer({
    method: "get",
    url: "/todos",
  });
};
