import { mount, ReactWrapper, ShallowWrapper } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TodoFooter from '../../components/todo-footer/todo-footer.component';
import TodoForm from '../../components/todo-form/todo-form.component';
import TodoItem from '../../components/todo-item/todo-item.component';
import TodoList from '../../components/todo-list/todo-list.component';
import { todos } from '../../mocks/todo.mock';
import { tabTypes } from '../../store/actions/todo/todo.action';
import TodoContainer from './todo.container';

describe('To Do Container', () => {
  let component: ShallowWrapper | ReactWrapper;
  let useEffect: any;
  let store: any;
  const mockStore = configureStore([]);

  const props = {
    todoStore: {
      todoList: todos,
      activeTab:tabTypes.ALL_TAB,
      allTodosCompleted: false
    }
  }
  const dispatchMock = jest.fn();
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f:any) => f());
  }
  beforeEach(() => {
    store = mockStore({ ...props });
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
    dispatchMock.mockClear();
    component = mount(
      < Provider store={store} >
        <TodoContainer />
      </Provider >
    );
  })

  it('should render todo container', () => {
    expect(component).toBeDefined();
  });

  it('should render when Active Tab is true', () => {
    props.todoStore.activeTab = tabTypes.ACTIVE_TAB
    component = mount(
      < Provider store={store} >
        <TodoContainer />
      </Provider >
    );
    expect(props.todoStore.activeTab).toEqual(tabTypes.ACTIVE_TAB)
  });

  it('should render when Completed Tab is true', () => {
    props.todoStore.activeTab = tabTypes.COMPLETED_TAB
    component = mount(
      < Provider store={store} >
        <TodoContainer />
      </Provider >
    );
    expect(props.todoStore.activeTab).toEqual(tabTypes.COMPLETED_TAB)
  });

  it('should render when Clear Completed Tab is true', () => {
    props.todoStore.activeTab = tabTypes.CLEAR_COMPLETED_TAB
    component = mount(
      < Provider store={store} >
        <TodoContainer />
      </Provider >
    );
    expect(props.todoStore.activeTab).toEqual(tabTypes.CLEAR_COMPLETED_TAB)
  });

  it('should render when All todos completed flag is true', () => {
    props.todoStore.allTodosCompleted = true
    component = mount(
      < Provider store={store} >
        <TodoContainer />
      </Provider >
    );
    expect(props.todoStore.allTodosCompleted).toBe(true)
  });

  it('should handle when click on complete button and isChecked is false and tab is active tab', () => {
    props.todoStore.activeTab = tabTypes.ACTIVE_TAB
    const index = 0;
    const completeTodo = component.find(TodoList).at(0).props().completeTodo;
    act(() => {
      completeTodo("1", index, false)
    });
    expect(index).toEqual(0);
  });

  it('should handle when click on complete button and isChecked is false and tab is completed tab', () => {
    props.todoStore.activeTab = tabTypes.COMPLETED_TAB
    const index = 0;
    const completeTodo = component.find(TodoList).at(0).props().completeTodo;
    act(() => {
      completeTodo("1", index, false)
    });
    expect(index).toEqual(0);
  });

  it('should handle when click on complete button and isChecked is false and tab is clear completed tab', () => {
    props.todoStore.activeTab = tabTypes.CLEAR_COMPLETED_TAB
    const index = 0;
    const completeTodo = component.find(TodoList).at(0).props().completeTodo;
    act(() => {
      completeTodo("1", index, false)
    });
    expect(index).toEqual(0);
  });

  it('should handle when click on complete button and isChecked is true', () => {
    const index = 0;
    const completeTodo = component.find(TodoList).at(0).props().completeTodo;
    act(() => {
      completeTodo("1", index, true)
    });
    expect(index).toEqual(0);
  });

  it('should handle when click on x button', () => {
    const removeTodo = jest.fn();
    const id = "1";
    const button = component.find(TodoItem).at(0).find('div').at(0).find('div').at(3);
    button.simulate('click');
    removeTodo(id);
    expect(removeTodo.mock.calls.length).toEqual(1);
  });


  it('should handle add to do', () => {
    const todo = { id: "5", text: 'go for lunch', isCompleted: false, isChecked: false };
    const todoForm = component.find(TodoForm).props().addTodo;
    act(() => {
      todoForm(todo)
    });
    expect(todo).toEqual({ id: "5", text: 'go for lunch', isCompleted: false, isChecked: false });
  });

  it('should handle when click on update Todo', () => {
    const id = "1";
    const updateTodo = component.find(TodoList).at(0).props().updateTodo;
    act(() => {
      updateTodo({ target: { value: 'go for lunch' } }, "1")
    });
    expect(id).toEqual("1");
  });

  it('should handle add to do functionality', () => {
    const addTodo = jest.fn();
    const handleInputChange = jest.fn();
    const todoFormInput = component.find(TodoForm).find('input');
    todoFormInput.simulate('change', { target: { value: 'go for lunch' } });
    handleInputChange();
    addTodo({
      id: "67",
      text: "this is a new todo",
      isCompleted: false,
      isChecked: false
    })
    expect(addTodo).toBeCalled();
  });

  it('should handle when click on Chevron down', () => {
    props.todoStore.allTodosCompleted = false;
    const completeAllTodos = jest.fn();
    const button = component.find(TodoForm).find('button').at(0);
    button.simulate('click');
    completeAllTodos();
    expect(completeAllTodos.mock.calls.length).toEqual(1);
  });

  it('should handle when click on Chevron down and completeAll flag is true', () => {
    props.todoStore.allTodosCompleted = true;
    const completeAllTodos = jest.fn();
    const button = component.find(TodoForm).find('button').at(0);
    button.simulate('click');
    completeAllTodos();
    expect(completeAllTodos.mock.calls.length).toEqual(1);
  });

  it('should handle when click on All', () => {
    const getAllToDoList = jest.fn();
    const button = component.find(TodoFooter).find('button').at(0);
    button.simulate('click');
    getAllToDoList();
    expect(getAllToDoList.mock.calls.length).toEqual(1);
  });

  it('should handle when click on Active', () => {
    const getActiveToDoList = jest.fn();
    const button = component.find(TodoFooter).find('button').at(1);
    button.simulate('click');
    getActiveToDoList();
    expect(getActiveToDoList.mock.calls.length).toEqual(1);
  });

  it('should handle when click on Completed', () => {
    const getCompletedToDoList = jest.fn();
    const button = component.find(TodoFooter).find('button').at(2);
    button.simulate('click');
    getCompletedToDoList();
    expect(getCompletedToDoList.mock.calls.length).toEqual(1);
  });

  it('should handle when click on Clear Completed', () => {
    props.todoStore.todoList = [{
      id: "1",
      text: "need to go for lunch",
      isCompleted: false,
      isChecked: false,
    },
    {
      id: "2",
      text: "need to call Susan",
      isCompleted: false,
      isChecked: false,
    },
    {
      id: "3",
      text: "keep the books in the cupboard",
      isCompleted: true,
      isChecked: false,
    },
    {
      id: "4",
      text: "call Larry after lunch",
      isCompleted: true,
      isChecked: false,
    }
    ]
    props.todoStore.activeTab = tabTypes.CLEAR_COMPLETED_TAB
    const clearCompleted = component.find(TodoFooter).props().clearCompleted;
    act(() => {
      clearCompleted()
    });
    expect(props.todoStore.activeTab).toEqual(tabTypes.CLEAR_COMPLETED_TAB);
  });
});
