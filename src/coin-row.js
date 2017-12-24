import React, { Component } from 'react';
import CoinData from './coin-data.js';
import DiffDescribe from './diff-describe.js';
import Precise from './precise.js';
import moment from 'moment';
import accounting from 'accounting';

class CoinRow extends Component {

  constructor(props) {
    super(props);
    this.desc = new DiffDescribe(props.row);
  }

  componentWillReceiveProps(nextProps) {
    this.desc = new DiffDescribe(nextProps.row);
  }

  classForInt(value) {
    return value > 0 ? 'happy' : 'sad';
  }

  get rowUpdatedAt() {
    const row = this.props.row;
    const val = row.value.last_updated;
    if (row.status && row.old) {
      return `${moment.unix(val).fromNow()}`;
    }
  }

  get rowClass() {
    if (this.props.row.status) { 
      return this.props.row.status;
    } else {
      return '';
    }
  }

  render() {
    const val = this.props.row.value;

    return(
      <tr className={this.rowClass}>
        <CoinData
          header={this.desc.format('rank', '#')}
          content={this.rowUpdatedAt}>
          {val.rank}
        </CoinData>

        <td>{val.symbol}</td>

        <CoinData
          header={this.desc.format('price_usd', '$')}
          content={this.rowUpdatedAt}>
          <span role="img" aria-label="money bags">💰 </span>
          ${accounting.format(val.price_usd, {
            precision: Precise.usd(val.price_usd)
          })}
        </CoinData>

        <CoinData
          className={this.classForInt(val.percent_change_24h)}
          header={this.desc.format('percent_change_24h', '%')}
          content={this.rowUpdatedAt}>
          {val.percent_change_24h}%
        </CoinData>

        <CoinData
          className={this.classForInt(val.percent_change_1h)}
          header={this.desc.format('percent_change_1h', '%')}
          content={this.rowUpdatedAt}>
          {val.percent_change_1h}%
        </CoinData>

        <CoinData
          className={this.classForInt(val.percent_change_7d)}
          header={this.desc.format('percent_change_7d', '%')}
          content={this.rowUpdatedAt}>
          {val.percent_change_7d}%
        </CoinData>

        <CoinData
          header={this.desc.format('market_cap_usd', '$')}
          content={this.rowUpdatedAt}>      
          ${accounting.format(val.market_cap_usd)}
        </CoinData>

        <td>{val.name}</td>
      </tr>
    )
  }
}

export default CoinRow;