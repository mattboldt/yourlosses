import React, { Component } from 'react';
import Api from './api.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      time: 15
    }
    this.forceUpdate = this.forceUpdate.bind(this);
    this.classForInt = this.classForInt.bind(this);
    this.setCountDown = this.setCountDown.bind(this);
  }

  componentDidMount(){
    this.forceUpdate();
    setInterval(() => this.forceUpdate(), 15000);
  }

  forceUpdate() {
    const oldRows = this.state.rows;
    Api.index().then((res) => {
      this.setCountDown();
      let newRows = res.map((i) => {
        let status = null;
        const oldRow = oldRows.find((r) => r.value.id === i.id);
        if (oldRow) {
          if (oldRow.value.price_usd > i.price_usd ||
              oldRow.value.rank > i.rank) {
            status = 'down';
          }
          if (oldRow.value.price_usd < i.price_usd ||
              oldRow.value.rank < i.rank) {
            status = 'up';
          }
        }
        return { value: i, status: status };
      });
      this.setState({ rows: newRows });
    });
  }

  setCountDown() {
    let time = this.state.time;
    setInterval(() => {
      time -= 1
      if (time <= 0) { time = 15 }
      this.setState({ time: time });
    }, 1000);
  }

  classForInt(value) {
    return value > 0 ? 'happy' : 'sad';
  }
  
  render() {
    let rowClass = '';
    return (
      <div>
        <table className="App">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Symbol</th>
              <th>Price (USD)</th>
              <th>Change (24H)</th>
              <th>Change (1H)</th>
              <th>Market Cap (USD)</th>
              <th>Full Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map((row, idx) => {
              if (row.status) { rowClass = row.status; }
              return(
                <tr key={idx} className={rowClass}>
                  <td>{row.value.rank}</td>
                  <td>{row.value.symbol}</td>
                  <td>
                    <span role="img" aria-label="money bags">💰 </span>
                    ${row.value.price_usd}
                  </td>
                  <td className={this.classForInt(row.value.percent_change_24h)}>
                    {row.value.percent_change_24h}%
                  </td>
                  <td className={this.classForInt(row.value.percent_change_1h)}>
                    {row.value.percent_change_1h}%
                  </td>
                  <td>${row.value.market_cap_usd}</td>
                  <td>{row.value.name}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p>{this.state.time}</p>
      </div>
    );
  }
}

export default App;
