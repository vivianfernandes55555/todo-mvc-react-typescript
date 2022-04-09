import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import React from "react";
import TodoForm from "./todo-form.component";


describe('todo form component', () => {
    let component: ShallowWrapper | ReactWrapper;
    const addTodo = jest.fn();
    beforeEach(() => {
        component = mount(
            <TodoForm
                addTodo={addTodo}
            />);
    })

    it('should render to do component', () => {
        expect(component).toBeDefined();
    });
})
