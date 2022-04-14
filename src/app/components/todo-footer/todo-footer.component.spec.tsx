import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import React from "react";
import { todos } from "../../mocks/todo.mock";
import TodoFooter from "./todo-footer.component";

describe('todo footer component', () => {
    let component: ShallowWrapper | ReactWrapper;
    const getAllToDoList = jest.fn();
    const getActiveToDoList = jest.fn();
    const getCompletedToDoList = jest.fn();
    const clearCompleted = jest.fn();
    beforeEach(() => {
        component = mount(
            <TodoFooter 
                todos={todos}
                getAllToDoList={getAllToDoList}
                getActiveToDoList={getActiveToDoList}
                getCompletedToDoList={getCompletedToDoList}
                clearCompleted={clearCompleted} />);
    })
    it('should render to do footer component', () => {
        expect(component).toBeDefined();
    });
})