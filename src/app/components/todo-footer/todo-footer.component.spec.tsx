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
    it('should handle when clicked on All button', () => {
        const getAllToDoList = jest.fn();
        const button = component.find('button').at(0);
        button.simulate('click');
        getAllToDoList();
        expect(getAllToDoList.mock.calls.length).toEqual(1);
      });

      it('should handle when clicked on Active button', () => {
        const getActiveToDoList = jest.fn();
        const button = component.find('button').at(1);
        button.simulate('click');
        getActiveToDoList();
        expect(getActiveToDoList.mock.calls.length).toEqual(1);
      });

      it('should handle when clicked on Complete button', () => {
        const getCompletedToDoList = jest.fn();
        const button = component.find('button').at(2);
        button.simulate('click');
        getCompletedToDoList();
        expect(getCompletedToDoList.mock.calls.length).toEqual(1);
      });

      it('should handle when clicked on Clear completed button', () => {
        const clearCompleted = jest.fn();
        const button = component.find('button').at(3);
        button.simulate('click');
        clearCompleted();
        expect(clearCompleted.mock.calls.length).toEqual(1);
      });
})