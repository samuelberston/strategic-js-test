import React from 'react';
import PropTypes from 'prop-types';

class AddDebt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creditor: null,
      firstName: null,
      lastName: null,
      percent: null,
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
      <div id="addDebt">
        <form onSubmit={addDebt}>
          <input id="creditor" type="text" placeholder="creditor" onChange={this.handleChange} />
          <input id="firstName" type="text" placeholder="first name" onChange={this.handleChange} />
          <input id="lastName" type="text" placeholder="last name" onChange={this.handleChange} />
          <label htmlFor="%">
            Min Pay Percentage
            <input id="percent" type="number" onChange={this.handleChange} />
          </label>
          <label htmlFor="balance">
            Balance
            <input id="balance" type="number" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Add Debt" />
        </form>
      </div>
    );
  }
}

AddDebt.propTypes = {
  addDebt: PropTypes.func.isRequired,
};

export default AddDebt;
