import Api from './api.js';
import Differ from './differ.js';

class CoinParser {

  fetchCoins(currentRows) {
    const self = this;

    return new Promise(function(resolve, reject) {
      Api.index().then((res) => {
        const newRows = res.map((row) => self.formatRow(row, currentRows));
        const anyUpdated = newRows.some((row) => row.status);

        const minutes = new Date().getMinutes();
        const needsUpdate = currentRows.length === 0 || anyUpdated;

        if (needsUpdate) {
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
      status: status,
      updatedAt: new Date()
    };
  }

}

export default new CoinParser();
