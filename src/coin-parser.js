import Api from './api.js';
import Differ from './differ.js';

class CoinParser {

  fetchCoins(rows) {
    return new Promise(function(resolve, reject) {
      Api.index().then((res) => {
        let newRows = res.map((i) => {
          const oldRow = rows.find((r) => r.value.id === i.id);
          const status = Differ.diff(oldRow, i);

          return {
            value: i,
            status: status
          };
        });

        localStorage.setItem('ticker-last-rows', JSON.stringify(newRows));
        resolve(newRows);
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

}

export default new CoinParser();
