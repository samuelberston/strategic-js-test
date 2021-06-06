import React from 'react';
import { shallow, configure } from 'enzyme';
import { JSDOM } from 'jsdom';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adapter() });

const doc = new JSDOM('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

it('should render the app', () => {
  const wrapper = shallow(<App />);
  const app = wrapper.find('#app');
  const dataTable = wrapper.find('#dataTable');
  const columns = wrapper.find('#columns');
  const accountData = wrapper.find('#accountData');
  const totals = wrapper.find('#totals');
  expect(app.exists()).toBe(true);
  expect(dataTable.exists()).toBe(true);
  expect(columns.exists()).toBe(true);
  expect(accountData.exists()).toBe(true);
  expect(totals.exists()).toBe(true);
});
