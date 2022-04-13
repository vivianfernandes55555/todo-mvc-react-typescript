import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoForm from "../../components/todo-form/todo-form.component";
import TodoItem from "../../components/todo/todo.component";
import { addToTodoList } from "../../store/actions/todo/todo.action";
import { todoStoreSelector } from "../../store/selectors/todo/todo.selector";
import "./../../../app.css";

export interface todoType {
  text: string,
  isCompleted: boolean,
  isChecked: boolean
}
const TodoContainer: FC = () => {
  const [todos, setTodos] = useState<todoType[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch() as any;
  const todoSelector = useSelector(todoStoreSelector);
  const [isActiveTab, setIsActiveTab] = useState(false);
  const [isCompletedTab, setIsCompletedTab] = useState(false);
  const [isAllTab, setIsAllTab] = useState(false);
  useEffect(() => {
    if (isActiveTab) {
      getActiveToDoList();
    }
    else if (isCompletedTab) {
      getCompletedToDoList();
    }
    else {
      setTodos(todoSelector.todoList);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoSelector.todoList]);

  const addTodo = (text: string) => {
    if(todoSelector.todoList.filter(el => el.text === text).length > 0){
      //todo already exists
      return;
    }
    const newTodos = [...todoSelector.todoList, { text: text, isCompleted: false, isChecked: false }];
    dispatch(addToTodoList(newTodos));
  };

  const completeTodo = (index: number, isChecked: boolean) => {
    const newTodos = [...todoSelector.todoList];
    if (isActiveTab) {
      const activeTodoList = todoSelector.todoList.filter((el: todoType) => el.isCompleted === false);
      index = newTodos.findIndex(el => el.text === activeTodoList[index].text);
    }
    else if(isCompletedTab){
      const compTodoList = todoSelector.todoList.filter((el: todoType) => el.isCompleted === true);
      index = newTodos.findIndex(el => el.text === compTodoList[index].text);
    }
    if (!isChecked) {
      newTodos[index].isCompleted = true;
      newTodos[index].isChecked = true;
    }
    else {
      newTodos[index].isCompleted = false;
      newTodos[index].isChecked = false;
    }
    dispatch(addToTodoList(newTodos));
  };

  const getAllToDoList = () => {
    setIsAllTab(true);
    setIsCompletedTab(false)
    setIsActiveTab(false);
    setTodos(todoSelector.todoList);
  };
  const getCompletedToDoList = () => {
    setIsAllTab(false);
    setIsCompletedTab(true)
    setIsActiveTab(false);
    setTodos(todoSelector.todoList.filter((el: todoType) => el.isCompleted === true));
  };
  const getActiveToDoList = () => {
    setIsAllTab(false);
    setIsCompletedTab(false)
    setIsActiveTab(true);
    setTodos(todoSelector.todoList.filter((el: todoType) => el.isCompleted === false));
  };
  const clearCompleted = () => {
    const newTodos = todoSelector.todoList.filter((el: todoType) => (el.isCompleted === false || el.isCompleted === true) && el.isChecked === false);
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
          <TodoItem
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