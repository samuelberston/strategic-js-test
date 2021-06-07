import React from 'react';
import axios from 'axios';

import AccountList from './AccountList.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
    };
  }

  componentDidMount() {
    this.getAccounts();
  }

  getAccounts = () => {
    axios.get('/data')
      .then((res) => {
        this.setState({
          accounts: res.data,
        });
      })
      .catch((err) => console.error(err));
  }

  addDebt = (e, account) => {
    e.preventDefault();
    const { accounts } = this.state;
    account.id = accounts.length + 1;
    account.balance = Number(account.balance);
    accounts.push(account);
    this.setState({
      accounts,
    });
  }

  deleteAccount = (e, cb) => {
    e.preventDefault();
    const { accounts } = this.state;
    const { id } = e.target;
    for (let i = 0; i < accounts.length; i += 1) {
      if (accounts[i].id === Number(id)) {
        accounts.splice(i, 1);
      }
    }
    this.setState({
      accounts,
    });
    cb();
  }

  render() {
    const {
      accounts, selected,
    } = this.state;
    return (
      <div id="app">
        <h1>
          Account Data
        </h1>
        <AccountList
          accounts={accounts}
          addDebt={this.addDebt}
          deleteAccount={this.deleteAccount}
        />
      </div>
    );
  }
}

export default App;
