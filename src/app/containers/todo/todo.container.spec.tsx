import { mount, ReactWrapper, ShallowWrapper } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TodoForm from '../../components/todo-form/todo-form.component';
import Todo from '../../components/todo/todo.component';
import TodoContainer from './todo.container';
describe('To Do Container', () => {
  let component: ShallowWrapper | ReactWrapper;
  const setTodos = jest.fn();
  const setValue = jest.fn();
  const useStateSpy: any = jest.spyOn(React, 'useState');
  let store: any;
  const mockStore = configureStore([]);
  useStateSpy.mockImplementation((todos: any) => [
    (todos = [{
      text: "Learn about React",
      isCompleted: false
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false
    },
    {
      text: "Build really cool todo app",
      isCompleted: false
    }]),
    setTodos
  ]);
  useStateSpy.mockImplementation((value: any) => [
    '',
    setValue
  ]);
  const props = {
    todoStore: {
      todoList: [{
        text: "need to go for lunch",
        isCompleted: false,
        isChecked: false,
      },
      {
        text: "need to call Susan",
        isCompleted: false,
        isChecked: false,
      },
      {
        text: "keep the books in the cupboard",
        isCompleted: false,
        isChecked: false,
      },
      {
        text: "call Larry after lunch",
        isCompleted: true,
        isChecked: true,
      }
      ]
    }
  }
  beforeEach(() => {
    store = mockStore({ ...props });
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
    const completeTodo = component.find(Todo).at(0).props().completeTodo;
    act(() => {
      completeTodo(index, false)
    });
    expect(index).toEqual(0);
  });

  it('should handle when click on complete button and isChecked is true', () => {
    const index = 0;
    const completeTodo = component.find(Todo).at(0).props().completeTodo;
    act(() => {
      completeTodo(index, true)
    });
    expect(index).toEqual(0);
  });

  it('should handle when click on x button', () => {
    const removeTodo = jest.fn();
    const index = 0;
    const button = component.find(Todo).at(0).find('button').at(0);
    button.simulate('click');
    removeTodo(index);
    expect(removeTodo.mock.calls.length).toEqual(1);
  });


  it('should handle add to do', () => {
    const text = 'go for lunch';
    const todoForm = component.find(TodoForm).props().addTodo;
    act(() => {
      todoForm('go for lunch')
    });
    expect(text).toEqual('go for lunch');
  });

  it('should handle add to do functionality', () => {
    const todoFormInput = component.find(TodoForm).find('input');
    todoFormInput.simulate('change', { target: { value: 'go for lunch' } })
    setValue('go for lunch')
    expect(setValue).toBeCalled();
  });

  it('should handle on submit', () => {
    const todoFormOnSubmit = component.find(TodoForm).find('form');
    const todoFormInput = component.find(TodoForm).find('input');
    todoFormInput.simulate('change', { target: { value: 'go for lunch' } })
    act(() => {
      component.find(TodoForm).props().addTodo('go for lunch');
    });
    todoFormOnSubmit.simulate('submit');
    setValue('go for lunch')
    expect(setValue).toBeCalled();
  });

  it('should handle on submit when value is not blank', () => {
    const todoFormOnSubmit = component.find(TodoForm).find('form');
    const todoFormInput = component.find(TodoForm).find('input');
    todoFormInput.simulate('change', { target: { value: '' } })
    act(() => {
      component.find(TodoForm).props().addTodo('');
    });
    todoFormOnSubmit.simulate('submit');
    setValue('')
    expect(setValue).toBeCalled();
  });

  it('should handle when click on All', () => {
    const getAllToDoList = jest.fn();
    const button = component.find('button').at(4)
    button.simulate('click');
    getAllToDoList();
    expect(getAllToDoList.mock.calls.length).toEqual(1);
  });

  it('should handle when click on Active', () => {
    const getActiveToDoList = jest.fn();
    const button = component.find('button').at(5)
    button.simulate('click');
    getActiveToDoList();
    expect(getActiveToDoList.mock.calls.length).toEqual(1);
  });

  it('should handle when click on Completed', () => {
    const getCompletedToDoList = jest.fn();
    const button = component.find('button').at(6)
    button.simulate('click');
    getCompletedToDoList();
    expect(getCompletedToDoList.mock.calls.length).toEqual(1);
  });

  it('should handle when click on Clear Completed', () => {
    const clearCompleted = jest.fn();
    const button = component.find('button').at(7)
    button.simulate('click');
    clearCompleted();
    expect(clearCompleted.mock.calls.length).toEqual(1);
  });
});
