import React from 'react';
import PropTypes from 'prop-types';

import Account from './Account.jsx';
import AddDebt from './AddDebt.jsx';
import css from './AccountList.module.css';

class AccountList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      total: 0,
      addDebtCliked: false,
      deleteMode: false,
    }
  }

  select = (e) => {
    const { accounts } = this.props;
    const { selected } = this.state;
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
    const { accounts } = this.props;
    const { selected } = this.state;

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
    const { accounts } = this.props;
    const { selected } = this.state;

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




  render() {
    const { accounts, addDebt, deleteAccount } = this.props;
    const {
      selected,
      total,
      addDebtClicked,
      deleteMode,
    } = this.state;
    return (
      <div id="dataTable" className={css.dataTable}>
        <div id="columns" className={css.columns}>
          <div id={css.selectAll} className={css.column}>
            <div role="button" id="selectAll" onClick={this.selectAll} onKeyPress={this.selectAll} tabIndex={0}>
              {selected.length === accounts.length && accounts.length !== 0
                ? (
                  <input type="checkbox" checked />
                ) : (
                  <input type="checkbox" />
                )}
            </div>
          </div>
          <div id="creditorName" className={css.column}>
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
              accounts.map((account) => {
                let checked;
                if (!selected.includes(account.id)) {
                  checked = false;
                } else {
                  checked = true;
                }
                return (
                  <Account
                    account={account}
                    select={this.select}
                    checked={checked}
                    deleteMode={deleteMode}
                    deleteAccount={deleteAccount}
                  />
                );
              }))
            : ''}
        </div>
        <div id={css.buttonsContainer}>
          <div id="addDebtContainer">
            <button
              type="button"
              onClick={this.addDebtClick}
            >
              {
                !addDebtClicked
                  ? 'Add Debt'
                  : 'Done Adding'
              }
            </button>
          </div>
          <div id="deleteDebtContainer">
            <button
              id={css.deleteButton}
              type="button"
              onClick={this.deleteClick}
            >
              {
                !deleteMode
                  ? 'Delete Accounts'
                  : 'Done Deleting'
              }
            </button>
          </div>
        </div>
        {
          addDebtClicked
            ? (
              <AddDebt addDebt={addDebt} />
            ) : ''
        }
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
            Total Balance: $
            {total}
            .00
          </div>
        </div>
      </div>
    );
  }
};

AccountList.propTypes = {
  accounts: PropTypes.objectOf(PropTypes.any).isRequired,
  addDebt: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

export default AccountList;
