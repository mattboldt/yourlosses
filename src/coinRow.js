import React, { Component } from 'react';

class CoinRow extends Component {
  constructor(props) {
    super(props);
    this.classForInt = this.classForInt.bind(this);
  }

  classForInt(value) {
    return value > 0 ? 'happy' : 'sad';
  }

  render() {
    const row = this.props.row;
    let rowClass = '';
    if (row.status) { rowClass = row.status; }

    return(
      <tr className={rowClass}>
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
  }
}

export default CoinRow;