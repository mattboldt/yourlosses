import React, { Component } from 'react';
import CoinData from './coin-data.js';
import moment from 'moment';
import accounting from 'accounting';

class CoinRow extends Component {
  constructor(props) {
    super(props);
    this.classForInt = this.classForInt.bind(this);
  }

  classForInt(value) {
    return value > 0 ? 'happy' : 'sad';
  }

  get rankTitle() {
    const row = this.props.row;
    return row.status &&
           row.old &&
           row.old.rank !== row.value.rank &&
           `Was #${row.old.rank}`;
  }

  get priceTitle() {
    const row = this.props.row;
    return row.status &&
           row.old &&
           row.old.price_usd !== row.value.price_usd &&
           `Was $${accounting.format(row.old.price_usd, { precision: 7 })}`;
  }

  get marketCapTitle() {
    const row = this.props.row;
    return row.status &&
           row.old &&
           row.old.market_cap_usd !== row.value.market_cap_usd &&
           `Was $${accounting.format(row.old.market_cap_usd)}`;
  }

  get change24Title() {
    const row = this.props.row;
    return row.status &&
           row.old &&
           row.old.percent_change_24h !== row.value.percent_change_24h &&
           `Was ${row.old.percent_change_24h}%`;
  }

  get change1Title() {
    const row = this.props.row;
    return row.status &&
           row.old &&
           row.old.percent_change_1h !== row.value.percent_change_1h &&
           `Was ${row.old.percent_change_1h}%`;
  }

  get rowUpdatedAt() {
    const row = this.props.row;
    return row.status && row.old && `${moment(row.updatedAt).fromNow()}`;
  }

  render() {
    const row = this.props.row;
    let rowClass = '';
    if (row.status) { rowClass = row.status; }

    return(
      <tr className={rowClass}>
        <CoinData
          header={this.rankTitle}
          content={this.rowUpdatedAt}>
          {row.value.rank}
        </CoinData>

        <td>{row.value.symbol}</td>

        <CoinData
          header={this.priceTitle}
          content={this.rowUpdatedAt}>
          <span role="img" aria-label="money bags">💰 </span>
          ${row.value.price_usd}
        </CoinData>

        <CoinData
          className={this.classForInt(row.value.percent_change_24h)}
          header={this.change24Title}
          content={this.rowUpdatedAt}>
          {row.value.percent_change_24h}%
        </CoinData>

        <CoinData
          className={this.classForInt(row.value.percent_change_1h)}
          header={this.change1Title}
          content={this.rowUpdatedAt}>
          {row.value.percent_change_1h}%
        </CoinData>

        <CoinData
          header={this.marketCapTitle}
          content={this.rowUpdatedAt}>      
          ${accounting.format(row.value.market_cap_usd)}
        </CoinData>

        <td>{row.value.name}</td>
      </tr>
    )
  }
}

export default CoinRow;