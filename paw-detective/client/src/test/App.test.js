import React from 'react';
import App from '../App';
import Enzyme, {mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider }from 'react-redux';

// const UserContext = React.createContext();

Enzyme.configure({ adapter: new Adapter() });

describe('test of <App />', () => {
  it('should display test text properly', () => {
    const wrapper = mount(
      <Provider >
        <App />
      </Provider>
  );
    expect(wrapper.find('test').exists()).toEqual(<p>test</p>)
   });
});