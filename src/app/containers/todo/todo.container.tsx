import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronDown } from "react-icons/fa";
import TodoForm from "../../components/todo-form/todo-form.component";
import TodoItem from "../../components/todo-item/todo-item.component";
import { addToTodoList } from "../../store/actions/todo/todo.action";
import { todoStoreSelector } from "../../store/selectors/todo/todo.selector";
import { todoType } from "../../types/todo.type";
import "./../../../app.css";

const TodoContainer: FC = () => {
  const [todos, setTodos] = useState<todoType[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch() as any;
  const todoSelector = useSelector(todoStoreSelector);
  const [isActiveTab, setIsActiveTab] = useState(false);
  const [isCompletedTab, setIsCompletedTab] = useState(false);
  const [completeAll, setCompleteAll] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const addTodo = (todo: todoType) => {
    const newTodos: todoType[] = [...todoSelector.todoList];
    newTodos.push(todo);
    dispatch(addToTodoList(newTodos));
  };

  // Check existing todo item as completed
  const completeTodo = (id: string, index: number, isChecked: boolean) => {
    const newTodos = [...todoSelector.todoList];
    if (isActiveTab) {
      const activeTodoList = todoSelector.todoList.filter((el: todoType) => el.isCompleted === false);
      index = newTodos.findIndex(el => el.id === activeTodoList[index].id);
    }
    else if (isCompletedTab) {
      const compTodoList = todoSelector.todoList.filter((el: todoType) => el.isCompleted === true);
      index = newTodos.findIndex(el => el.id === compTodoList[index].id);
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
    setCompleteAll(false);
    const newTodos = todoSelector.todoList.filter((el: todoType) => (el.isCompleted === false || el.isCompleted === true) && el.isChecked === false);
    dispatch(addToTodoList(newTodos));
  };
  const removeTodo = (id: string) => {
    // Prepare new todos state
    const newTodosState: todoType[] = todos.filter((todo: todoType) => todo.id !== id);
    dispatch(addToTodoList(newTodosState));
  };
  const completeAllTodos = () => {
    let newTodosState: todoType[] = [];
    // Prepare new todos state
    if (!completeAll) {
      todoSelector.todoList.forEach((el: todoType) => {
        el.isCompleted = true;
        el.isChecked = true;
      })
    } else {
      todoSelector.todoList.forEach((el: todoType) => {
        el.isCompleted = false;
        el.isChecked = false;
      })
    }
    newTodosState = todoSelector.todoList;
    dispatch(addToTodoList(newTodosState));
    setCompleteAll(!completeAll);
  };

  // Update existing todo item
  const updateTodo = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    // Prepare new todos state
    const newTodos: todoType[] = [...todos]

    // Find correct todo item to update
    const index = newTodos.findIndex((todo: todoType) => todo.id === id);
    newTodos[index].text = event.target.value;
    // Update todos state
    dispatch(addToTodoList(newTodos));
  }

  return (
    <div className="app">
      <div className="todo-list">
        <button
          onClick={() => completeAllTodos()}
          disabled={todos.length === 0}>
          <FaChevronDown />
        </button>
        <TodoForm
          addTodo={addTodo}
        />
        {todos.length > 0 && todos.map((todo: todoType, index: number) => (
          <li key={todo.id}>
            <TodoItem
              key={todo.id}
              index={index}
              todo={todo}
              updateTodo={updateTodo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          </li>
        ))}
        <div >
          {`Items Left:  ${todoSelector.todoList.filter((el: todoType) => el.isChecked === false).length} `}
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