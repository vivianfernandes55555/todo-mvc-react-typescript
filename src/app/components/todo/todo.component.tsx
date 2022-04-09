import React, { FC } from "react";
import "./../../../app.css";

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

const Todo: FC<todoProps> = (todoProps: todoProps) => {
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

export default Todo;