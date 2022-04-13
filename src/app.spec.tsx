import { mount, ReactWrapper, ShallowWrapper } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App from './app';
import { todos } from './app/mocks/todo.mock';

describe('App file', () => {
  let component: ShallowWrapper | ReactWrapper;
  let store: any;
  const mockStore = configureStore([]);
  const props = {
    todoStore: {
      todoList: todos
    }
  }
  
  beforeEach(() => {
    store = mockStore({ ...props });
    component = mount(
      < Provider store={store} >
        <App />
      </Provider >
    );
  })

  it('should render App.tsx', () => {
    expect(component).toBeDefined();
  });
});
