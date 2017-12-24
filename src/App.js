import React, { Component } from 'react';
import CoinParser from './coin-parser.js';
import CoinRow from './coin-row.js';
import { Divider, Container } from 'semantic-ui-react';

const INTERVAL = 100 / 14;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: CoinParser.initRows(),
      time: 0,
      isPolling: true,
      countDown: null
    }
    this.fetchCoins = this.fetchCoins.bind(this);
    this.setCountDown = this.setCountDown.bind(this);
  }

  componentDidMount(){
    this.fetchCoins();
    setInterval(this.fetchCoins, 15000);
  }

  fetchCoins() {
    this.initCountdown();

    CoinParser.fetchCoins(this.state.rows).then((res) => {
      if (res) {
        this.setState({ rows: res });
      }
    });
  }

  initCountdown() {
    if (this.state.countDown) {
      clearInterval(this.state.countDown);
    }
    this.setState({
      countDown: setInterval(this.setCountDown, 1000),
      time: 0
    });
  }

  setCountDown() {
    let time = this.state.time;
    time += INTERVAL;
    this.setState({ time: time });
  }
  
  render() {
    return (
      <div className="App">
        <Container style={{width: 800}}>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Symbol</th>
                <th>Price (USD)</th>
                <th>Change (24H)</th>
                <th>Change (1H)</th>
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
            Data Source: <a href='https://coinmarketcap.com/'>Coinmon</a> | 
            By <a href='https://mattboldt.com/?utm_source=yourlosses'>Matt Boldt</a> |
            Contribute on <a href='https://github.com/mattboldt/yourlosses'>GitHub</a>
          </small>

          <Divider />

        </Container>
        <div
          className="progress"
          style={{ width: `${this.state.time}%` }}>
        </div>
      </div>
    );
  }
}

export default App;
