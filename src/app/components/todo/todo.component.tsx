import React, { FC, useState } from "react";
import "./../../../app.css";

export type todoType =  {
    isCompleted:boolean,
    text:string,
    isChecked:boolean
  }
export interface todoProps {
    todo: todoType,
    index:number,
    completeTodo: (index:number,isChecked:boolean) => void,
    removeTodo:(index:number) => void
  }

const Todo: FC<todoProps> = (todoProps: todoProps) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleOnChange = () => {
        setIsChecked(!isChecked);
        todoProps.completeTodo(todoProps.index,isChecked);

      };
    const handleRemove = () => {
        setIsChecked(!isChecked);
        todoProps.removeTodo(todoProps.index);
      };
    return (
        <div
            className="todo"
            style={{ textDecoration: todoProps.todo.isCompleted ? "line-through" : "" }}
        >
            <input type="checkbox" 
            id={todoProps.todo.text} 
            name={todoProps.todo.text} 
            value={todoProps.todo.text} 
            checked={todoProps.todo.isChecked}
            onChange={handleOnChange}
            />
            {todoProps.todo.text}
            <div className="todo_button">
                <button className="button" onClick={() => handleRemove()}>x</button>
            </div>
        </div>
    );
}

export default Todo;