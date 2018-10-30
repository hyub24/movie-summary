import React from 'react';
import { mount, shallow, render } from 'enzyme';
import App from '../client/components/app.jsx';

test('checks if app component has div with class name test', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.test').exists()).toBe(true);
});
