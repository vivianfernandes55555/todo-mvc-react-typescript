import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoForm from "../../components/todo-form/todo-form.component";
import Todo from "../../components/todo/todo.component";
import { addToTodoList } from "../../store/actions/todo/todo.action";
import { todoStoreSelector } from "../../store/selectors/todo/todo.selector";
import "./../../../app.css";

export interface todoType {
  text: string,
  isCompleted: boolean,
  isChecked:boolean
}
const TodoContainer: FC = () => {
  const [todos, setTodos] = useState<todoType[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch() as any;
  const todoSelector = useSelector(todoStoreSelector);
  useEffect(() => {
    setTodos(todoSelector.todoList);
  }, [todoSelector.todoList]);

  const addTodo = (text: string) => {
    const newTodos = [...todoSelector.todoList, { text: text, isCompleted: false, isChecked: false }];
    dispatch(addToTodoList(newTodos));
  };

  const completeTodo = (index: number,isChecked:boolean) => {
    const newTodos = [...todoSelector.todoList];
    if(!isChecked){
      newTodos[index].isCompleted = true;
      newTodos[index].isChecked = true;
    }
    else{
      newTodos[index].isCompleted = false;
      newTodos[index].isChecked = false;
    }
    dispatch(addToTodoList(newTodos));
  };

  const getAllToDoList = () => {
    setTodos(todoSelector.todoList);
  };
  const getCompletedToDoList = () => {
    setTodos(todoSelector.todoList.filter((el: todoType) => el.isCompleted === true));
  };
  const getActiveToDoList = () => {
    setTodos(todoSelector.todoList.filter((el: todoType) => el.isCompleted === false));
  };
  const clearCompleted = () => {
    const newTodos = todoSelector.todoList.filter((el: todoType) => (el.isCompleted === false || el.isCompleted === true) && el.isChecked === false)
    dispatch(addToTodoList(newTodos));
  };


  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    dispatch(addToTodoList(newTodos));
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.length > 0 && todos.map((todo: todoType, index: number) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
        <div >
          <button className="button" onClick={() => getAllToDoList()}>All</button>
          <button className="button" onClick={() => getActiveToDoList()}>Active</button>
          <button className="button" onClick={() => getCompletedToDoList()}>Completed</button>
          {todoSelector.todoList.filter((el: todoType) => el.isChecked === true).length > 0 && <button className="button" onClick={() => clearCompleted()}>Clear Completed</button>}

        </div>

      </div>
    </div>
  );
}

export default TodoContainer;