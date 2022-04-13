import React, { ChangeEvent, FC } from "react";
import "./../../../app.css";

export type todoType = {
  isCompleted: boolean,
  text: string,
  isChecked: boolean
}
export interface todoProps {
  todo: todoType,
  index: number,
  completeTodo: (index: number, isChecked: boolean) => void,
  removeTodo: (index: number) => void
}

const TodoItem: FC<todoProps> = (todoProps: todoProps) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    todoProps.completeTodo(todoProps.index, todoProps.todo.isChecked);
  };
  const handleRemove = () => {
    todoProps.removeTodo(todoProps.index);
  };  
  return (
    <div
      className="todo"
    >
      <input type="checkbox"
        id={todoProps.todo.text}
        name={todoProps.todo.text}
        value={todoProps.todo.text}
        checked={todoProps.todo.isChecked}
        onChange={handleOnChange}
      />
      <div style={{ textDecoration: todoProps.todo.isCompleted ? "line-through" : "" }}> {todoProps.todo.text} </div>
      <button className="button" onClick={() => handleRemove()}>x</button>
    </div>
  );
}

export default TodoItem;