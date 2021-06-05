import React from 'react';
import axios from 'axios';

import Account from './Account.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountData: null,
    };
    this.getAccountData = this.getAccountData.bind(this);
  }

  componentDidMount() {
    this.getAccountData();
  }

  getAccountData() {
    axios.get('/data')
      .then((res) => {
        this.setState({
          accountData: res.data,
        });
      });
  }

  render() {
    let { accountData } = this.state;
    return (
      <div>
        <h1>
          Account Data
        </h1>
        {accountData
          ? (
            <div id="DataTable">
              {accountData.map((account) => (
                <Account account={account} />
              ))}
            </div>
          )
          : ''}
      </div>
    );
  }
}

export default App;
