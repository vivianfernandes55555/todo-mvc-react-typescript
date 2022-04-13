import { mount, ReactWrapper, ShallowWrapper } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TodoForm from '../../components/todo-form/todo-form.component';
import TodoItem from '../../components/todo-item/todo-item.component';
import TodoContainer from './todo.container';

describe('To Do Container', () => {
  let component: ShallowWrapper | ReactWrapper;
  let useEffect: any;
  const setTodos = jest.fn();
  const setIsAllTab = jest.fn();
  const setIsActiveTab = jest.fn();
  const setIsCompletedTab = jest.fn();
  const setCompleteAll = jest.fn();
  const useStateSpy: any = jest.spyOn(React, 'useState');
  let store: any;
  const mockStore = configureStore([]);
  useStateSpy.mockImplementation((todos: any) => [
    (todos = [{
      id: "1",
      text: "Learn about React",
      isCompleted: false
    },
    {
      id: "2",
      text: "Meet friend for lunch",
      isCompleted: false
    },
    {
      id: "3",
      text: "Build really cool todo app",
      isCompleted: false
    }]),
    setTodos
  ]);
  useStateSpy.mockImplementation((completeAll: boolean) => [
    false,
    setCompleteAll
  ]);
  useStateSpy.mockImplementation((isAllTab: boolean) => [
    false,
    setIsAllTab
  ]);
  useStateSpy.mockImplementation((isActiveTab: boolean) => [
    false,
    setIsActiveTab
  ]);
  useStateSpy.mockImplementation((isCompletedTab: boolean) => [
    false,
    setIsCompletedTab
  ]);
  const props = {
    todoStore: {
      todoList: [{
        id: "1",
        text: "need to go for lunch",
        isCompleted: false,
        isChecked: false,
      },
      {
        id: "2",
        text: "need to call Susan",
        isCompleted: false,
        isChecked: false,
      },
      {
        id: "3",
        text: "keep the books in the cupboard",
        isCompleted: false,
        isChecked: false,
      },
      {
        id: "4",
        text: "call Larry after lunch",
        isCompleted: true,
        isChecked: true,
      }
      ]
    },
    isActiveTab:true,
    isCompletedTab:false,
    isAllTab:false
  }
  const dispatchMock = jest.fn();
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f:any) => f());
  }
  beforeEach(() => {
    store = mockStore({ ...props });
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
    dispatchMock.mockClear();
    component = mount(
      < Provider store={store} >
        <TodoContainer />
      </Provider >
    );
  })

  it('should render App.tsx', () => {
    expect(component).toBeDefined();
  });

  it('should handle when click on complete button and isChecked is false', () => {
    const index = 0;
    const completeTodo = component.find(TodoItem).at(0).props().completeTodo;
    act(() => {
      completeTodo("1", index, false)
    });
    expect(index).toEqual(0);
  });

  it('should handle when click on complete button and isChecked is true', () => {
    const index = 0;
    const completeTodo = component.find(TodoItem).at(0).props().completeTodo;
    act(() => {
      completeTodo("1", index, true)
    });
    expect(index).toEqual(0);
  });

  it('should handle when click on x button', () => {
    const removeTodo = jest.fn();
    const id = "1";
    const button = component.find(TodoItem).at(0).find('div').at(0).find('div').at(3);
    button.simulate('click');
    removeTodo(id);
    expect(removeTodo.mock.calls.length).toEqual(1);
  });


  it('should handle add to do', () => {
    const todo = { id: "5", text: 'go for lunch', isCompleted: false, isChecked: false };
    const todoForm = component.find(TodoForm).props().addTodo;
    act(() => {
      todoForm(todo)
    });
    expect(todo).toEqual({ id: "5", text: 'go for lunch', isCompleted: false, isChecked: false });
  });

  it('should handle when click on update Todo', () => {
    const id = "1";
    const updateTodo = component.find(TodoItem).at(0).props().updateTodo;
    act(() => {
      updateTodo({ target: { value: 'go for lunch' } }, "1")
    });
    expect(id).toEqual("1");
  });

  it('should handle add to do functionality', () => {
    const addTodo = jest.fn();
    const handleInputChange = jest.fn();
    const todoFormInput = component.find(TodoForm).find('input');
    todoFormInput.simulate('change', { target: { value: 'go for lunch' } });
    handleInputChange();
    addTodo({
      id: "67",
      text: "this is a new todo",
      isCompleted: false,
      isChecked: false
    })
    expect(addTodo).toBeCalled();
  });

  it('should handle when click on Chevron down', () => {
    const completeAllTodos = jest.fn();
    const button = component.find('button').at(0);
    button.simulate('click');
    completeAllTodos();
    expect(completeAllTodos.mock.calls.length).toEqual(1);
  });

  it('should handle when click on Chevron down and completeAll flag is true', async () => {
    await setCompleteAll(true);
    const completeAllTodos = jest.fn();
    const button = component.find('button').at(0);
    button.simulate('click');
    completeAllTodos();
    expect(completeAllTodos.mock.calls.length).toEqual(1);
  });

  it('should handle when click on All', () => {
    const getAllToDoList = jest.fn();
    const button = component.find('button').at(1);
    button.simulate('click');
    getAllToDoList();
    setIsAllTab(true);
    setIsActiveTab(false);
    setIsCompletedTab(false);
    expect(getAllToDoList.mock.calls.length).toEqual(1);
  });

  it('should handle when click on Active', () => {
    const getActiveToDoList = jest.fn();
    const button = component.find('button').at(2)
    button.simulate('click');
    getActiveToDoList();
    setIsAllTab(false);
    setIsActiveTab(true);
    setIsCompletedTab(false);
    expect(getActiveToDoList.mock.calls.length).toEqual(1);
  });

  it('should handle when click on Completed', () => {
    const getCompletedToDoList = jest.fn();
    const button = component.find('button').at(3)
    button.simulate('click');
    getCompletedToDoList();
    setIsAllTab(false);
    setIsActiveTab(false);
    setIsCompletedTab(true);
    expect(getCompletedToDoList.mock.calls.length).toEqual(1);
  });

  it('should handle when click on Clear Completed', () => {
    const clearCompleted = jest.fn();
    const button = component.find('button').at(4)
    button.simulate('click');
    clearCompleted();
    expect(clearCompleted.mock.calls.length).toEqual(1);
  });
});
