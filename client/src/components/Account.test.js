import React from 'react';
import { shallow, configure } from 'enzyme';
import { JSDOM } from 'jsdom';

import Adapter from 'enzyme-adapter-react-16';
import Account from './App';

configure({ adapter: new Adapter() });

const doc = new JSDOM('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

const account = {
  id: 1,
  balance: 2763,
  creditorName: 'AMEX',
  firstName: 'Vidal',
  lastName: 'Sassoon',
  minPaymentPercentage: 2,
};

it('should render an account', () => {
  const wrapper = shallow(<Account account={account} select={() => {}} allSelected={false} />);
  const app = wrapper.find('#app');
  expect(app.exists()).toBe(true);
});
