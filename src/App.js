import React, { Component } from 'react';
import Differ from './differ.js';
import Api from './api.js';
import CoinRow from './coinRow.js';
import { Button, Divider, Container } from 'semantic-ui-react';

const INTERVAL = 100 / 15;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: this.initRows(),
      time: 0,
      isPolling: true,
      countDown: null
    }
    this.forceUpdate = this.forceUpdate.bind(this);
    this.setCountDown = this.setCountDown.bind(this);
    this.setRows = this.setRows.bind(this);
    // this.togglePolling = this.togglePolling.bind(this);
  }

  componentDidMount(){
    this.forceUpdate();
    setInterval(this.forceUpdate, 15000);
  }

  initRows() {
    let rows = null;
    const localRows = localStorage.getItem('ticker-last-rows');

    if (localRows) {
      rows = JSON.parse(localRows);
    }
    return rows ? rows : [];
  }

  setRows(newRows) {
    this.setState({ rows: newRows });
    localStorage.setItem('ticker-last-rows', JSON.stringify(newRows));
  }

  forceUpdate() {
    const rows = this.state.rows;
    Api.index().then((res) => {
      this.initCountdown();
      let newRows = res.map((i) => {
        const oldRow = rows.find((r) => r.value.id === i.id);
        const status = Differ.diff(oldRow, i);
        return { value: i, status: status };
      });
      this.setRows(newRows);
    });
  }

  initCountdown() {
    if (this.state.countDown) {
      clearInterval(this.state.countDown);
    }
    this.setState({
      countDown: setInterval(this.setCountDown, 1000)
    });
  }

  setCountDown() {
    let time = this.state.time;
    time += INTERVAL;
    if (time >= 100) { time = 0 }
    this.setState({ time: time });
  }

  // togglePolling() {
  //   clearInterval(this.forceUpdate);
  //   clearInterval(this.setCountDown);
  //   this.setState({ isPolling: !this.state.isPolling });
  // }
  
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
