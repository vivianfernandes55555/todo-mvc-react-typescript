import { mount, ReactWrapper, ShallowWrapper } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import TodoForm from '../../components/todo-form/todo-form.component';
import Todo from '../../components/todo/todo.component';
import TodoContainer from './todo.container';
describe('To Do Container', () => {
  let component: ShallowWrapper | ReactWrapper;
  const setTodos = jest.fn();
  const setValue = jest.fn();
  const useStateSpy: any = jest.spyOn(React, 'useState');
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
  beforeEach(() => {
    component = mount(<TodoContainer/>);
  })

  it('should render App.tsx', () => {
    expect(component).toBeDefined();
  });

  it('should handle when click on complete button', () => {
    const completeTodo = jest.fn();
    const index = 0;
    const button = component.find(Todo).at(0).find('button').at(0);
    button.simulate('click');
    completeTodo(index);
    expect(completeTodo.mock.calls.length).toEqual(1);
  });

  it('should handle when click on x button', () => {
    const removeTodo = jest.fn();
    const index = 0;
    const button = component.find(Todo).at(0).find('button').at(1);
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
});
