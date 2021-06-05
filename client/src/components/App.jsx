import React from 'react';
import axios from 'axios';

import css from './App.modules.css';

import Account from './Account.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      selected: [],
      total: 0,
      allSelected: false,
    };
    this.getAccounts = this.getAccounts.bind(this);
    this.select = this.select.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.selectAll = this.selectAll.bind(this);
  }

  componentDidMount() {
    this.getAccounts();
    this.calculateTotal();
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

  selectAll() {
    const { accounts, selected } = this.state;

    // unselected all
    if (accounts.length === selected.length) {
      this.setState({
        selected: [],
        total: 0,
      });
      this.setState({
        allSelected: false,
      });
    // select all
    } else {
      const tmp = [];
      let tmp2 = 0;

      accounts.forEach((account) => {
        tmp.push(account.id);
        tmp2 += account.balance;
      });

      this.setState({
        selected: tmp,
        total: tmp2,
      });

      this.setState({
        allSelected: true,
      });
    }
  }

  calculateTotal() {
    console.log('calc');
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
    const {
      accounts, selected, total, allSelected,
    } = this.state;
    return (
      <div>
        <h1>
          Account Data
        </h1>
        <div id="dataTable" className={css.dataTable}>
          <div id="columns" className={css.columns}>
            <div id={css.selectAll} className={css.column}>
              <div role="button" id="selectAll" onClick={this.selectAll} onKeyPress={this.selectAll} tabIndex={0}>
                <input type="checkbox" />
              </div>
            </div>
            <div id="creditor" className={css.column}>
              Creditor
            </div>
            <div id="firstName" className={css.column}>
              First Name
            </div>
            <div id="lastName" className={css.column}>
              Last Name
            </div>
            <div id="minPay%" className={css.column}>
              Min Pay %
            </div>
            <div id="balance" className={css.column}>
              Balance
            </div>
          </div>
          <div id="accountData" className={css.accountData}>
            {accounts
              ? (
                accounts.map((account) => (
                  <Account account={account} select={this.select} allSelected={allSelected} />
                )))
              : ''}
          </div>
          <div id="totals" className={css.totals}>
            <div id="totalRows">
              Total Row Count:
              &nbsp;
              {accounts.length}
            </div>
            <div id="totalChecked">
              Check Row Count:
              &nbsp;
              {selected.length}
            </div>
            <div id="totalBalance">
              Total Balance:
              &nbsp;
              {total}
              .00
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
