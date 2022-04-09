import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import React from "react";
import Todo from "./todo.component";

describe('todo component', () => {
    let component: ShallowWrapper | ReactWrapper;
    const completeTodo = jest.fn();
    const removeTodo= jest.fn();
    beforeEach(() => {
        component = mount(
        <Todo todo={{
            isCompleted: false,
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
})
