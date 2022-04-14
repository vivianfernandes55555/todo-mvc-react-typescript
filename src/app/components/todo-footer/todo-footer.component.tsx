import React, { FC } from "react";
import { todoFooterProps } from "../../interfaces/todo-interfaces";
import { todoType } from "../../types/todo.type";
import "./../../../app/styles/styles.css";

const TodoFooter: FC<todoFooterProps> = (props: todoFooterProps) => {
  const { todos } = props;
  return (
    <div >
      <div >
          <button className="button" onClick={() => props.getAllToDoList()}>All</button>
          <button className="button" onClick={() => props.getActiveToDoList()}>Active</button>
          <button className="button" onClick={() => props.getCompletedToDoList()}>Completed</button>
          {todos.filter((el: todoType) => el.isChecked === true).length > 0 && <button className="button" onClick={() => props.clearCompleted()}>Clear Completed</button>}
        </div>
    </div>
  )
}

export default TodoFooter;