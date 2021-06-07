import React from 'react';
import PropTypes from 'prop-types';

import Account from './Account.jsx';
import AddDebt from './AddDebt.jsx';
import css from './AccountList.module.css';

const AccountList = ({
  accounts,
  selected,
  total,
  addDebtClicked,
  deleteMode,
  select,
  selectAll,
  addDebtClick,
  addDebt,
  deleteClick,
  deleteAccount,
}) => (
  <div id="dataTable" className={css.dataTable}>
    <div id="columns" className={css.columns}>
      <div id={css.selectAll} className={css.column}>
        <div role="button" id="selectAll" onClick={selectAll} onKeyPress={selectAll} tabIndex={0}>
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
                select={select}
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
          onClick={addDebtClick}
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
          onClick={deleteClick}
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

AccountList.propTypes = {
  accounts: PropTypes.objectOf(PropTypes.any).isRequired,
  selected: PropTypes.arrayOf(PropTypes.any).isRequired,
  total: PropTypes.number.isRequired,
  addDebtClicked: PropTypes.bool.isRequired,
  deleteMode: PropTypes.bool.isRequired,
  select: PropTypes.func.isRequired,
  selectAll: PropTypes.func.isRequired,
  addDebtClick: PropTypes.func.isRequired,
  addDebt: PropTypes.func.isRequired,
  deleteClick: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

export default AccountList;
