import { mount, ReactWrapper, ShallowWrapper } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App from './app';

describe('App file', () => {
  let component: ShallowWrapper | ReactWrapper;
  let store: any;
  const mockStore = configureStore([]);
  const props = {
    todoStore: {
      todoList: [{
        text: "need to go for lunch",
        isCompleted: false,
        isChecked: false,
      },
      {
        text: "need to call Susan",
        isCompleted: false,
        isChecked: false,
      },
      {
        text: "keep the books in the cupboard",
        isCompleted: false,
        isChecked: false,
      },
      {
        text: "call Larry after lunch",
        isCompleted: true,
        isChecked: true,
      }
      ]
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
