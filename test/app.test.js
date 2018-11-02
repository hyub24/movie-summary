import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../client/components/App';

const mockSummary = {
  title: 'Jaws',
  genre: 'horror',
  synopsis: 'there is a shark in the water',
  releaseDate: 'April 1st, 3000',
  photos: ['photo1', 'photo2', 'photo3', 'photo4', 'photo5'],
};

describe('App', () => {
  beforeEach(() => {
    // jest.resetAllMocks();
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockSummary),
    }));
  });

  test('checks if app component has element with class name rating-duration', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.rating-duration').exists()).toBe(true);
  });

  test('tests if initial state has given values', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state('summary').genre).toBe('comedy');
    expect(wrapper.state('index')).toBe(0);
    expect(wrapper.state('translateValue')).toBe(0);
  });

  test('correct state after fetch in componentDidMount', () => {
    const wrapper = shallow(<App />);

    Promise.resolve(wrapper.instance().componentDidMount())
      .then(() => {
        wrapper.update();
      })
      .then(() => {
        expect(wrapper.state('summary')).toEqual({
          title: 'Jaws',
          genre: 'horror',
          synopsis: 'there is a shark in the water',
          releaseDate: 'April 1st, 3000',
          photos: ['photo1', 'photo2', 'photo3', 'photo4', 'photo5'],
        });
      })
      .catch(error => console.error(error));
  });

  test('catches error if fetch fails', () => {
    const wrapper = shallow(<App />);
    window.fetch = jest.fn().mockImplementationOnce(() => Promise.reject(
      new Error('failed'),
    ));
    Promise.resolve(wrapper.instance().componentDidMount())
      .then(() => {
        wrapper.update();
      })
      .then(() => {
        expect(wrapper.state('summary')).toEqual({
          title: 'wedding crashers',
          genre: 'comedy',
          releaseDate: 'June 20th, 2000',
          photos: [],
          synopsis: '',
        });
      })
      .catch(error => console.error(error));
  });

  test('check state after nextPhoto', () => {
    const wrapper = shallow(<App />);
    wrapper.state('summary').photos = ['photo1', 'photo2', 'photo3', 'photo4', 'photo5'];
    wrapper.instance().photoWidth = jest.fn().mockReturnValue(45);
    wrapper.instance().nextPhoto();
    expect(wrapper.state('index')).toBe(1);
    expect(wrapper.state('translateValue')).toBe(-45);
  });

  test('check that nextPhoto function does not change state when carousel is at end', () => {
    const wrapper = shallow(<App />);
    wrapper.state('summary').photos = ['photo1', 'photo2', 'photo3', 'photo4', 'photo5'];
    wrapper.instance().photoWidth = jest.fn().mockReturnValue(45);
    wrapper.instance().nextPhoto();
    wrapper.instance().nextPhoto();
    wrapper.instance().nextPhoto();
    expect(wrapper.state('index')).toBe(2);
  });
});
