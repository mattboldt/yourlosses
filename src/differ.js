const FIELDS = ['price_usd', 'price_btc', 'rank', 'percent_change_24h', 'percent_change_1h', 'market_cap_usd'];

class Differ {
  diff(oldRow, newRow) {
    if (!oldRow) { return; }
    let state = null;

    FIELDS.every((key, idx) => {
      if (oldRow.value[key] > newRow[key]) {
        state = 'down';
        return false;
      } else if (oldRow.value[key] < newRow[key]) {
        state = 'up';
        return false;
      } else {
        return true;
      }
    });

    return state;
  }
}

export default new Differ();
