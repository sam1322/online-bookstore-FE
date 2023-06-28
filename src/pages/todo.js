import React, { useEffect, useState } from "react";
import axios from "axios";
import { addTodoURl, getTodoListURl } from "@/constants/path";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = async () => {
    try {
      axios.defaults.headers.common['ngrok-skip-browser-warning'] = "any value";

      const data = await axios
        // .get("api/v1/todo")
        .get(getTodoListURl)
        // .get(getTodoListURl, {
        //   headers: {
        //     "ngrok-skip-browser-warning": true,
        //   },
        // })
        .then((res) => res.data);
      console.log("data", data);
      setTodoList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      if (title.trim() == "" || desc.trim() == "") return;
      const res = await axios.post(addTodoURl, {
        title: title,
        description: desc,
      });
      // .then((res) => console.log(res));
      console.log("response", res);
      if (res.status == 200) {
        getTodo();
        setTitle("");
        setDesc("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-red-500">Todo List</h1>
      {Array.isArray(todoList) &&
        todoList?.map((item, index) => (
          <div key={index}>
            <div className="text-lg">title : {item.title}</div>
            <div className="text-sm">description :{item.description}</div>
          </div>
        ))}
      <form onAction onSubmit={addTodo}>
        <label>title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>description</label>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default Todo;
