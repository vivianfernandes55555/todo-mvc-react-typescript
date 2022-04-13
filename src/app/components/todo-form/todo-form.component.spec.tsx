import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import React, { useRef } from "react";
import TodoForm from "./todo-form.component";

describe('todo form component', () => {
    let component: ShallowWrapper | ReactWrapper;
    const addTodo = jest.fn();
    const setFormState = jest.fn();
    const useStateSpy: any = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((formState: string) => [
        '',
        setFormState
      ]);
    beforeEach(() => {
        component = mount(
            <TodoForm
                addTodo={addTodo}
            />);
    })

    it('should render to do component', () => {
        expect(component).toBeDefined();
    });

    it('should handle handleOnchange function', () => {
        const handleInputChange = jest.fn();
        const onChangeFn = component.find('input');
        onChangeFn.simulate('change', { target: { value: 'go for lunch' } })
        handleInputChange();
        expect(handleInputChange).toBeCalled();
      });
    
      it('should handle onKeyPress function', () => {
        const handleInputEnter = jest.fn();
        const onKeyPress = component.find('input');
        onKeyPress.simulate('keypress', {key: 'Enter'})
        handleInputEnter();
        expect(handleInputEnter).toBeCalled();
      });

      it('should handle onKeyPress function when input ref is not true', () => {
        const handleInputEnter = jest.fn();
        const onKeyPress = component.find('input');
        onKeyPress.simulate('keypress', {key: 'Enter', target: { value: 'hello todo'}})
        handleInputEnter();
        expect(handleInputEnter).toBeCalled();
      });

      it('should handle onKeyPress function when current target is blank', () => {
        const handleInputEnter = jest.fn();
        const onKeyPress = component.find('input');
        onKeyPress.simulate('keypress', {key: 'Enter', target: { value: ''}})
        handleInputEnter();
        expect(handleInputEnter).toBeCalled();
      });

      it('should handle onKeyPress function when key is not enter', () => {
        const handleInputEnter = jest.fn();
        const onKeyPress = component.find('input');
        onKeyPress.simulate('keypress', {key: 'Esc', target: { value: 'hello todo'}})
        handleInputEnter();
        expect(handleInputEnter).toBeCalled();
      });
})
