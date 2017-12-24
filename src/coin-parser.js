import Api from './api.js';
import Differ from './differ.js';
import moment from 'moment';

class CoinParser {

  fetchCoins(currentRows) {
    const self = this;

    return new Promise(function(resolve, reject) {
      Api.index().then((res) => {
        const newRows = res.map((row) =>
          self.formatRow(row, currentRows)
        );

        if (self.needsUpdate(newRows, currentRows)) {
          localStorage.setItem('ticker-last-rows', JSON.stringify(newRows));
          resolve(newRows);
        } else {
          resolve();
        }

      });
    });
  }

  initRows() {
    let rows = null;
    const localRows = localStorage.getItem('ticker-last-rows');

    if (localRows) {
      rows = JSON.parse(localRows);
    }
    return rows ? rows : [];
  }

  formatRow(row, currentRows) {
    const oldRow = currentRows.find((r) => r.value.id === row.id);
    const status = Differ.diff(oldRow, row);
    return {
      value: row,
      old: oldRow ? oldRow.value : null,
      status: status
    };
  }

  needsUpdate(newRows, oldRows) {
    if (oldRows.length === 0) {
      return true;
    }

    const expiryTime = moment().subtract(20, 'minutes').toDate();
    const oldDate = moment.unix(oldRows[0].value.last_updated).toDate();
    if (oldDate < expiryTime) {
      return true;
    }

    const newStatuses = newRows.some((row) => row.status);
    if (newStatuses) {
      return true;
    }

    const existingIds = oldRows.map((row) => row.value.id);
    const newIds = newRows.map((row) => row.value.id);

    const newHasOld = existingIds.every((id) => newIds.includes(id))
    const oldHasNew = newIds.every((id) => existingIds.includes(id));

    if (newHasOld && oldHasNew) {
      return false;
    }

    return true;
  }

}

export default new CoinParser();
