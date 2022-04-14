import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import React from "react";
import TodoItem from "./todo-item.component";

describe('todo item component', () => {
  let component: ShallowWrapper | ReactWrapper;
  const completeTodo = jest.fn();
  const removeTodo = jest.fn();
  const updateTodo = jest.fn();
  beforeEach(() => {
    component = mount(
      <TodoItem todo={{
        id:'1213242424',
        isCompleted: true,
        isChecked: true,
        text: "go out for lunch"
      }}
        index={0}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />);
  })

  it('should render to do item component', () => {
    expect(component).toBeDefined();
  });

  it('should handle when isCompleted is false', () => {
    const isCompleted = false;
    component = mount(
      <TodoItem todo={{
        id:'1213242424',
        isCompleted: false,
        isChecked: false,
        text: "go out for lunch"
      }}
        key={'1213242424'}
        index={0}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />);
    expect(isCompleted).toBe(false);
  });

  it('should handle handleOnchange function', () => {
    const handleOnChange = jest.fn();
    const onChangeFn = component.find('input');
    onChangeFn.simulate('change', { target: { value: 'go for lunch' } })
    handleOnChange();
    expect(handleOnChange).toBeCalled();
  });

  it('should handle completeTodo function', () => {
    const completeTodo = jest.fn();
    const button = component.find('div').at(1);
    button.simulate('click');
    completeTodo();
    expect(completeTodo.mock.calls.length).toEqual(1);
  });

  it('should handle removeTodo function', () => {
    const removeTodo = jest.fn();
    const button = component.find('div').at(3);
    button.simulate('click');
    removeTodo();
    expect(removeTodo.mock.calls.length).toEqual(1);
  });
})
