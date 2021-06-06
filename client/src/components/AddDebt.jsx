import React from 'react';
import PropTypes from 'prop-types';
import css from './AddDebt.module.css';

class AddDebt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creditorName: null,
      firstName: null,
      lastName: null,
      minPaymentPercentage: null,
      balance: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  render() {
    const { addDebt } = this.props;
    return (
      <div id="addDebt" className={css.addDebt}>
        <form id="form" className={css.form} onSubmit={(e) => { addDebt(e, this.state)}}>
          <label htmlFor="creditorName">
            Creditor Name
            <input id="creditorName" type="text" placeholder="creditor" onChange={this.handleChange} required />
          </label>
          <label htmlFor="firstName">
            First Name
            <input id="firstName" type="text" placeholder="first name" onChange={this.handleChange} required />
          </label>
          <label htmlFor="lastName">
            Last Name
            <input id="lastName" type="text" placeholder="last name" onChange={this.handleChange} required />
          </label>
          <label htmlFor="%">
            Min Pay %
            <input id="minPaymentPercentage" type="number" onChange={this.handleChange} required />
          </label>
          <label htmlFor="balance">
            Balance
            <input id="balance" type="number" onChange={this.handleChange} required />
          </label>
          <input id={css.submit} type="submit" value="Add Debt" />
        </form>
      </div>
    );
  }
}

AddDebt.propTypes = {
  addDebt: PropTypes.func.isRequired,
};

export default AddDebt;
