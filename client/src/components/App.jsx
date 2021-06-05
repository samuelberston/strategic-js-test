import React from 'react';
import axios from 'axios';

import Account from './Account.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: null,
      selected: [],
      total: null,
    };
    this.getAccounts = this.getAccounts.bind(this);
    this.select = this.select.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  componentDidMount() {
    this.getAccounts();
  }

  getAccounts() {
    axios.get('/data')
      .then((res) => {
        this.setState({
          accounts: res.data,
        });
      });
  }

  select(e) {
    const { accounts, selected } = this.state;
    const id = selected.indexOf(Number(e.target.value));
    if (id !== -1) {
      selected.splice(id, 1);
      this.setState({
        selected,
      });
    } else {
      accounts.forEach((account) => {
        console.log(typeof e.target.value, typeof account.id);
        if (Number(e.target.value) === Number(account.id)) {
          selected.push(account.id);
          this.setState({
            selected,
          });
        }
      });
    }
    this.calculateTotal();
  }

  calculateTotal() {
    let total = 0;
    const { selected, accounts } = this.state;

    accounts.forEach((account) => {
      if (selected.includes(account.id)) {
        total += account.balance;
      }
    });

    this.setState({
      total,
    });
  }

  render() {
    const { accounts } = this.state;
    return (
      <div>
        <h1>
          Account Data
        </h1>
        <div id="dataTable">
          <div id="columns">
            <div id="creditor">
              Creditor
            </div>
            <div id="firstName">
              First Name
            </div>
            <div id="lastName">
              Last Name
            </div>
            <div id="minPay%">
              Min Pay %
            </div>
            <div id="balance">
              Balance
            </div>
          </div>
          {accounts
            ? (
              accounts.map((account) => (
                <Account account={account} select={this.select} />
              )))
            : ''}
        </div>
      </div>
    );
  }
}

export default App;
