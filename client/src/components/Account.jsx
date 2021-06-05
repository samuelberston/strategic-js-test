import React from 'react';
import PropTypes from 'prop-types';
import css from './Account.module.css';

const Account = ({ account, select, checked }) => {
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
      {checked
        ? (
          <div className={css.column} role="button" id={css.select} onClick={select} onKeyPress={select} value={id} tabIndex={0}>
            <input type="checkbox" value={id} checked />
          </div>
        )
        : (
          <div className={css.column} role="button" id={css.select} onClick={select} onKeyPress={select} value={id} tabIndex={0}>
            <input type="checkbox" value={id} />
          </div>
        )}
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
    </div>
  );
};

Account.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  select: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default Account;
