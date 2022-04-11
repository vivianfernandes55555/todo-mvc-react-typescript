import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import Todo from "./todo.component";

describe('todo component', () => {
  let component: ShallowWrapper | ReactWrapper;
  const useStateSpy: any = jest.spyOn(React, 'useState');
  const completeTodo = jest.fn();
  const removeTodo = jest.fn();
  const setIsChecked = jest.fn();

  useStateSpy.mockImplementation((isChecked: boolean) => [
    false,
    setIsChecked
  ]);
  beforeEach(() => {
    component = mount(
      <Todo todo={{
        isCompleted: true,
        isChecked: true,
        text: "go out for lunch"
      }}
        index={0}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
      />);
  })

  it('should render to do component', () => {
    expect(component).toBeDefined();
  });

  it('should handle when isCompleted is false', () => {
    const isCompleted = false;
    component = mount(
      <Todo todo={{
        isCompleted: false,
        isChecked: false,
        text: "go out for lunch"
      }}
        index={0}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
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

  it('should handle handleRemove function', () => {
    const handleRemove = jest.fn();
    const button = component.find('button');
    button.simulate('click');
    handleRemove();
    expect(removeTodo.mock.calls.length).toEqual(1);
  });
})
