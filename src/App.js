import React, { Component } from 'react';
import CoinParser from './coin-parser.js';
import CoinRow from './coin-row.js';
import Countdown from './countdown.js';
import { Divider, Container } from 'semantic-ui-react';

const FETCH_RATE = 15000;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: CoinParser.initRows(),
      fetchedAt: null
    }

    this.fetchCoins = this.fetchCoins.bind(this);
  }

  componentDidMount(){
    this.fetchCoins();
    setInterval(this.fetchCoins, FETCH_RATE);
  }

  fetchCoins() {
    this.setState({ fetchedAt: new Date() });

    CoinParser.fetchCoins(this.state.rows).then((res) => {
      if (res) {
        this.setState({ rows: res });
      }
    });
  }
  
  render() {
    return (
      <div className="App">
        <Container style={{width: 950}}>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Symbol</th>
                <th>Price (USD)</th>
                <th>Change (24H)</th>
                <th>Change (1H)</th>
                <th>Change (1W)</th>
                <th>Market Cap (USD)</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {this.state.rows.map((row, idx) =>
                <CoinRow key={idx} row={row} />
              )}
            </tbody>
          </table>

          <Divider />

          <small>
            Data Source: <a href="https://coinmarketcap.com/">coinmarketcap</a> | 

            Made with <span role="img" aria-label="love">❤️</span> by <a href='https://mattboldt.com/?utm_source=yourlosses'>Matt Boldt</a> |

            Contribute on <a href="https://github.com/mattboldt/yourlosses">GitHub</a> |

            <a href="http://www.uscourts.gov/services-forms/bankruptcy">Learn About Bankruptcy</a>
          </small>

          <Divider />

        </Container>

        <Countdown fetchedAt={this.state.fetchedAt} rate={FETCH_RATE} />
      </div>
    );
  }
}

export default App;
