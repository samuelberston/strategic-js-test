import React from 'react';
import axios from 'axios';

import DataTable from './DataTable.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      selected: [],
      total: 0,
      addDebtClicked: false,
      deleteMode: false,
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
      });
  }

  select = (e) => {
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
        }
      });
      this.setState({
        selected,
      });
    }
    this.calculateTotal();
  }

  selectAll = () => {
    const { accounts, selected } = this.state;

    // unselected all
    if (accounts.length === selected.length) {
      this.setState({
        selected: [],
        total: 0,
      });
    // select all
    } else {
      let total = 0;

      accounts.forEach((account) => {
        total += account.balance;
      });

      this.setState({
        selected: accounts.map((acc) => acc.id),
        total,
       });
    }
  }

  calculateTotal = () => {
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

  addDebtClick = () => {
    const { addDebtClicked } = this.state;
    this.setState({
      addDebtClicked: !addDebtClicked,
      deleteMode: false,
    });
  }

  deleteClick = () => {
    const { deleteMode } = this.state;
    this.setState({
      deleteMode: !deleteMode,
      addDebtClicked: false,
    });
  }

  addDebt = (e, account) => {
    e.preventDefault();
    const { accounts } = this.state;
    account.id = accounts.length + 1;
    account.balance = Number(account.balance);
    accounts.push(account);
    this.setState({
      accounts,
      addDebtClicked: false,
    });
    this.calculateTotal();
  }

  deleteAccount = (e) => {
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
    this.calculateTotal();
  }

  render() {
    const {
      accounts, selected, total, addDebtClicked, deleteMode,
    } = this.state;
    return (
      <div id="app">
        <h1>
          Account Data
        </h1>
        <DataTable
          accounts={accounts}
          selected={selected}
          total={total}
          addDebtClicked={addDebtClicked}
          deleteMode={deleteMode}
          select={this.select}
          selectAll={this.selectAll}
          addDebtClick={this.addDebtClick}
          addDebt={this.addDebt}
          deleteClick={this.deleteClick}
          deleteAccount={this.deleteAccount}
        />
      </div>
    );
  }
}

export default App;
