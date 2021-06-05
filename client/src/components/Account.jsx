const React = require('react');
const PropTypes = require('prop-types');

const Account = ({ account, select }) => {
  const {
    id,
    creditorName,
    firstName,
    lastName,
    minPaymentPercentage,
    balance,
  } = account;
  return (
    <div id={id}>
      <div role="button" id="select" onClick={select} onKeyPress={select} value={id} tabIndex={0}>
        <input type="checkbox" value={id} />
      </div>
      <div id="creditor">
        {creditorName}
      </div>
      <div id="firstName">
        {firstName}
      </div>
      <div id="lastName">
        {lastName}
      </div>
      <div id="minPay%">
        {minPaymentPercentage}
      </div>
      <div id="balance">
        {balance}
      </div>
    </div>
  );
};

Account.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
  select: PropTypes.func.isRequired,
};

export default Account;
