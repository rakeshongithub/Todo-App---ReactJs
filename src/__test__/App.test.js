import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import App from '../components/App';

// describe('App', () => {
//   it('should be able to run the test', () => {
//     expect(1 + 2).toEqual(3);
//   });
// });

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

})