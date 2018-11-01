import React from 'react';
import { mount, shallow, render } from 'enzyme';
import App from '../client/components/app.jsx';

const wrapper = shallow(<App />);

test('checks if app component has element with class name rating-duration', () => {
  expect(wrapper.find('.rating-duration').exists()).toBe(true);
});

test('tests if initial state has given values', () => {
  expect(wrapper.state('summary').genre).toBe('comedy');
})