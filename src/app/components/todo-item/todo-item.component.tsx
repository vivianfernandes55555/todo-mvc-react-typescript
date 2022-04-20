import React, { FC } from "react";
import { todoItemProps } from "../../interfaces/todo-interfaces";
import "./../../../app/styles/styles.css";

const TodoItem: FC<todoItemProps> = (props: todoItemProps) => {
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.value)
              props.updateTodo(event, props.todo.id)
          }}
        />
      </div>

      <div className="item-remove" onClick={() => props.removeTodo(props.todo.id)}>
        &#x02A2F;
      </div>
    </div>
  )
}

export default TodoItem;