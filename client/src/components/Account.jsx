import React from 'react';
import PropTypes from 'prop-types';
import css from './Account.module.css';

const Account = ({ account, select, checked, deleteMode, deleteAccount }) => {
  const {
    id,
    creditorName,
    firstName,
    lastName,
    minPaymentPercentage,
    balance,
  } = account;
  return (
    <div id={id} className={css.account}>
      <div className={css.column} role="button" id={css.select} onClick={select} onKeyPress={select} value={id} tabIndex={0}>
        <input type="checkbox" value={id} checked={checked} />
      </div>
      <div id="creditor" className={css.column}>
        {creditorName}
      </div>
      <div id="firstName" className={css.column}>
        {firstName}
      </div>
      <div id="lastName" className={css.column}>
        {lastName}
      </div>
      <div id="minPay%" className={css.column}>
        {minPaymentPercentage}
        %
      </div>
      <div id="balance" className={css.column}>
        $
        {balance}
        .00
      </div>
      {
        deleteMode
          ? (
            <button id={id} className={css.deleteButton} type="button" onClick={deleteAccount}>
              X
            </button>
          ) : ''
      }
    </div>
  );
};

Account.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  select: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  deleteMode: PropTypes.bool.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

export default Account;
