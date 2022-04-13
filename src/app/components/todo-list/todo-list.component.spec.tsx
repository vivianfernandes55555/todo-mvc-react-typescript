import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import React from "react";
import TodoItem from "../todo-item/todo-item.component";

describe('todo list component', () => {
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

  it('should render to do component', () => {
    expect(component).toBeDefined();
  });

})