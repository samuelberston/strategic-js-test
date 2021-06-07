import React from 'react';
import PropTypes from 'prop-types';

import Account from './Account.jsx';
import AddDebt from './AddDebt.jsx';
import css from './AccountList.module.css';

class AccountList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      total: 0,
      addDebtClicked: false,
      deleteMode: false,
    }
  }

  select = (e) => {
    const { accounts } = this.props;
    const { selected } = this.state;

    if(selected[e.target.value] !== undefined) {
      delete selected[e.target.value];
    } else {
      selected[e.target.value] = true;
    }
    this.setState({
      selected,
    });
    this.calculateTotal();
  }

  selectAll = () => {
    const { accounts } = this.props;
    const { selected } = this.state;
    let total = 0;

    // unselected all
    if (accounts.length === Object.keys(selected).length) {
      this.setState({
        selected: {},
        total,
      });
    // select all
    } else {

      accounts.forEach((acc) => {
        total += acc.balance;
        selected[acc.id] = true;
      });

      this.setState({
        selected,
        total,
       });
    }
  }

  calculateTotal = () => {
    let total = 0;
    const { accounts } = this.props;
    const { selected } = this.state;

    accounts.forEach((account) => {
      if (selected[account.id] !== undefined) {
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
      <div id="accountList" className={css.accountList}>
        <div id="columns" className={css.columns}>
          <div id={css.selectAll} className={css.column}>
            <div role="button" id="selectAll" onClick={this.selectAll} onKeyPress={this.selectAll} tabIndex={0}>
              {Object.keys(selected).length === accounts.length && accounts.length !== 0
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
                if(selected[account.id]) {
                  checked = true;
                } else {
                  checked = false;
                }
                return (
                  <Account
                    account={account}
                    select={this.select}
                    checked={checked}
                    deleteMode={deleteMode}
                    deleteAccount={(e) => deleteAccount(e, this.calculateTotal)}
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
            {Object.keys(selected).length}
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
  accounts: PropTypes.arrayOf(PropTypes.any).isRequired,
  addDebt: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

export default AccountList;
