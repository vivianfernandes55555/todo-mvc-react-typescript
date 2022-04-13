import React, { FC } from "react";
import { todoListProps } from "../../interfaces/todo-interfaces";
import { todoType } from "../../types/todo.type";
import TodoItem from "../todo-item/todo-item.component";
import "./../../../app.css";

const TodoList: FC<todoListProps> = (props: todoListProps) => {
  const { todos } = props;
  return (
    <div className="todo-list">
      {todos.length > 0 && todos.map((todo: todoType, index: number) => (
          <li key={todo.id}>
            <TodoItem
              key={todo.id}
              index={index}
              todo={todo}
              updateTodo={props.updateTodo}
              completeTodo={props.completeTodo}
              removeTodo={props.removeTodo}
            />
          </li>
        ))}
    </div>
  )
}

export default TodoList;