import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../client/components/app.jsx';

const wrapper = mount(<App />);

expect(wrapper.find('div')).toExist();
