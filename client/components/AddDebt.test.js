import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddDebt from './AddDebt.jsx';

configure({ adapter: new Adapter() });

it('should render the AddDebt section', () => {
  const wrapper = shallow(<AddDebt addDebt={() => {}} />);
  const AD = wrapper.find('#addDebt');
  expect(AD.exists()).toBe(true);
});
