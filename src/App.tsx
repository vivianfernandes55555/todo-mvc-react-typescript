import React, { FC, useState } from "react";
import "./App.css";
export type todoType =  {
  isCompleted:boolean,
  text:string
}

export interface todoProps {
  todo: todoType,
  index:number,
  completeTodo: (index:number) => void,
  removeTodo:(index:number) => void
}
export interface todoFormProps {
  addTodo: (value:string) => void
}

export const Todo = (todoProps: todoProps) => {
  return (
    <div
      className="todo"
      style={{ textDecoration: todoProps.todo.isCompleted ? "line-through" : "" }}
    >
      {todoProps.todo.text}
      <div>
        <button onClick={() => todoProps.completeTodo(todoProps.index)}>Complete</button>
        <button onClick={() => todoProps.removeTodo(todoProps.index)}>x</button>
      </div>
    </div>
  );
}

export const TodoForm = (todoFormProps:todoFormProps) => {
  const [value, setValue] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (!value) return;
    todoFormProps.addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}


const App:FC = () =>  {
  const [todos, setTodos] = useState([
    {
      text: "Learn about React",
      isCompleted: false
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false
    },
    {
      text: "Build really cool todo app",
      isCompleted: false
    }
  ]);

  const addTodo = (text:string) => {
    const newTodos = [...todos, { text: text , isCompleted:false}];
    setTodos(newTodos);
  };

  const completeTodo = (index:number) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = (index:number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;