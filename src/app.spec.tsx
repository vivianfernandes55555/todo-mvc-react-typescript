import { mount, ReactWrapper, ShallowWrapper } from 'enzyme';
import React from 'react';
import App from './app';

describe('App file', () => {
  let component: ShallowWrapper | ReactWrapper;
  beforeEach(() => {
    component = mount(<App/>);
  })

  it('should render App.tsx', () => {
    expect(component).toBeDefined();
  });
});
