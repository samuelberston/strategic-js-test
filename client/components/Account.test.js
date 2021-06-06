import React from 'react';
import { shallow, configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import Account from './Account.jsx';
import regeneratorRuntime from 'regenerator-runtime';

configure({ adapter: new Adapter() });

const data = {
  id: 1,
  balance: 2763,
  creditorName: 'AMEX',
  firstName: 'Vidal',
  lastName: 'Sassoon',
  minPaymentPercentage: 2,
};

function tick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

it('should render an account', () => {
  const wrapper = shallow(<Account
    account={data}
    select={() => {}}
    deleteAccount={() => {}}
    deleteMode={false}
    checked={false}
  />);

  const creditor = wrapper.find('#creditor');
  const firstName = wrapper.find('#firstName');
  const lastName = wrapper.find('#lastName');
  const balance = wrapper.find('#balance');
  const minPay = wrapper.find('#minPay');

  expect(creditor.exists()).toBe(true);
  expect(firstName.exists()).toBe(true);
  expect(lastName.exists()).toBe(true);
  expect(balance.exists()).toBe(true);
  expect(minPay.exists()).toBe(true);
});
