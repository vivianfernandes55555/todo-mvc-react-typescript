import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoForm from "../../components/todo-form/todo-form.component";
import { addToTodoList, setActiveTab, setAllTodoCompleted, tabTypes } from "../../store/actions/todo/todo.action";
import { todoStoreSelector } from "../../store/selectors/todo/todo.selector";
import { todoType } from "../../types/todo.type";
import "./../../../app.css";
import TodoList from "../../components/todo-list/todo-list.component";
import TodoFooter from "../../components/todo-footer/todo-footer.component";

const TodoContainer: FC = () => {
  const [todos, setTodos] = useState<todoType[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch() as any;
  const todoSelector = useSelector(todoStoreSelector);
  useEffect(() => {
    if (todoSelector.activeTab === tabTypes.ACTIVE_TAB) {
      getActiveToDoList();
    }
    else if (todoSelector.activeTab === tabTypes.COMPLETED_TAB) {
      getCompletedToDoList();
    }
    else {
      setTodos(todoSelector.todoList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todoSelector.todoList]);

  const addTodo = (todo: todoType) => {
    dispatch(setAllTodoCompleted(false));
    const newTodos: todoType[] = [...todoSelector.todoList];
    newTodos.push(todo);
    dispatch(addToTodoList(newTodos));
  };

  // Check existing todo item as completed
  const completeTodo = (id: string, index: number, isChecked: boolean) => {
    dispatch(setAllTodoCompleted(false));
    const newTodos = [...todoSelector.todoList];
    if (todoSelector.activeTab === tabTypes.ACTIVE_TAB) {
      const activeTodoList = todoSelector.todoList.filter((el: todoType) => el.isCompleted === false);
      index = newTodos.findIndex(el => el.id === activeTodoList[index].id);
    }
    else if (todoSelector.activeTab === tabTypes.COMPLETED_TAB) {
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

  //Get All Todos List
  const getAllToDoList = () => {
    dispatch(setActiveTab(tabTypes.ALL_TAB));
    setTodos(todoSelector.todoList);
  };

  //Get Completed Todos List
  const getCompletedToDoList = () => {
    dispatch(setActiveTab(tabTypes.COMPLETED_TAB));
    setTodos(todoSelector.todoList.filter((el: todoType) => el.isCompleted === true));
  };

  //Get Active Todos List
  const getActiveToDoList = () => {
    dispatch(setActiveTab(tabTypes.ACTIVE_TAB));
    setTodos(todoSelector.todoList.filter((el: todoType) => el.isCompleted === false));
  };

  //Clear Selected Todos List
  const clearCompleted = () => {
    dispatch(setAllTodoCompleted(false));
    dispatch(setActiveTab(tabTypes.CLEAR_COMPLETED_TAB));
    const newTodos = todoSelector.todoList.filter((el: todoType) => (el.isCompleted === false || el.isCompleted === true) && el.isChecked === false);
    dispatch(addToTodoList(newTodos));
  };

  //Remove Todo from List
  const removeTodo = (id: string) => {
    dispatch(setAllTodoCompleted(false));
    // Prepare new todos state
    const newTodosState: todoType[] = todos.filter((todo: todoType) => todo.id !== id);
    dispatch(addToTodoList(newTodosState));
  };

  //Mark all todos as completed
  const completeAllTodos = () => {
    let newTodosState: todoType[] = [];
    // Prepare new todos state
    if (!todoSelector.allTodosCompleted) {
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
    dispatch(setAllTodoCompleted(!todoSelector.allTodosCompleted));
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
      <div className="todo-list-app">
        <TodoForm
          todos={todos}
          addTodo={addTodo}
          completeAllTodos={completeAllTodos}
        />
        <TodoList
          todos={todos}
          updateTodo={updateTodo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
        />
        {`Items Left:  ${todos.filter((el: todoType) => el.isChecked === false).length} `}
        <TodoFooter 
          todos={todos}
          getAllToDoList={getAllToDoList}
          getActiveToDoList={getActiveToDoList}
          getCompletedToDoList={getCompletedToDoList}
          clearCompleted={clearCompleted}
        />
      </div>
    </div>
  );
}

export default TodoContainer;