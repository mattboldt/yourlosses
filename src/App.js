import React, { Component } from 'react';
import CoinParser from './coin-parser.js';
import CoinRow from './coinRow.js';
import { Button, Divider, Container } from 'semantic-ui-react';

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
    this.forceUpdate = this.forceUpdate.bind(this);
    this.setCountDown = this.setCountDown.bind(this);
  }

  componentDidMount(){
    this.forceUpdate();
    setInterval(this.forceUpdate, 15000);
  }

  forceUpdate() {
    this.initCountdown();

    CoinParser.fetchCoins(this.state.rows).then((res) => {
      this.setState({ rows: res });
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

          {/* <Button
            onClick={this.togglePolling}
            secondary>
            {this.state.isPolling ? 'Stop' : 'Start'} Polling
          </Button> */}
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
