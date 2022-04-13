import React, { ChangeEvent, FC } from "react";
import { todoType } from "../../types/todo.type";
import "./../../../app.css";

export interface todoProps {
  todo: todoType,
  index: number,
  completeTodo: (id: string, index: number, isChecked: boolean) => void,
  removeTodo: (id: string) => void,
  updateTodo: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}

const TodoItem: FC<todoProps> = (props: todoProps) => {
  return (
    <div className='todo-item'>
      <div onClick={() => props.completeTodo(props.todo.id, props.index, props.todo.isCompleted)}>
        {props.todo.isCompleted ? (
          <span className="todo-item-checked">&#x2714;</span>
        ) : (
          <span className="todo-item-unchecked" />
        )}
      </div>

      <div className="todo-item-input-wrapper">
        <input
          style={{ textDecoration: props.todo.isCompleted ? "line-through" : "" }}
          value={props.todo.text}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.updateTodo(event, props.todo.id)}
        />
      </div>

      <div className="item-remove" onClick={() => props.removeTodo(props.todo.id)}>
        &#x02A2F;
      </div>
    </div>
  )
}

export default TodoItem;