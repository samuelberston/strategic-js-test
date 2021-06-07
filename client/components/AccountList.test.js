import React from 'react';
import { shallow, configure } from 'enzyme';
import { JSDOM } from 'jsdom';
import Adapter from 'enzyme-adapter-react-16';
import AccountList from './AccountList';

configure({ adapter: new Adapter() });

const doc = new JSDOM('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

it('should display the data table', () => {
  const wrapper = shallow(<AccountList accounts={[{"id":1,"creditorName":"CBNA","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":2,"balance":1363},{"id":2,"creditorName":"AMEX","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":2,"balance":2763},{"id":3,"creditorName":"AMEX","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":2,"balance":429},{"id":4,"creditorName":"AMEX","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":2,"balance":1363},{"id":5,"creditorName":"DISCOVERBANK","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":2,"balance":2644},{"id":6,"creditorName":"CAPITAL ONE","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":4,"balance":5464},{"id":7,"creditorName":"CAPITAL ONE","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":4,"balance":2345},{"id":8,"creditorName":"CAPITAL ONE","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":4,"balance":836},{"id":9,"creditorName":"CBNA","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":3.5,"balance":687},{"id":10,"creditorName":"CBNA","firstName":"Suman","lastName":"Tester79","minPaymentPercentage":3.5,"balance":235}]} addDebt={() => {}} deleteAccount={() => {}} />);
  const dataTable = wrapper.find('#accountList');
  const columns = wrapper.find('#columns');
  const accountData = wrapper.find('#accountData');
  const totals = wrapper.find('#totals');

  expect(dataTable.exists()).toBe(true);
  expect(columns.exists()).toBe(true);
  expect(accountData.exists()).toBe(true);
  expect(totals.exists()).toBe(true);
});
