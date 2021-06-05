const React = require('react');
const PropTypes = require('prop-types');

const Account = ({ account }) => {
  const {
    id,
    creditorName,
    firstName,
    lastName,
    minPaymentPercentage,
    balance,
  } = account;
  return (
    <div>
      {id}
      {creditorName}
      {firstName}
      {lastName}
      {minPaymentPercentage}
      {balance}
    </div>
  );
};

Account.propTypes = {
  account: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Account;
