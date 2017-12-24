import accounting from 'accounting';
import Precise from './precise.js';

class DiffDescribe {
  constructor(row) {
    this.row = row;
  }

  format(prop, prefix = '') {
    const row = this.row;    
    const updated =
      row.status &&
      row.old &&
      row.old[prop] !== row.value[prop];
    
    if (!updated) { return; }

    let val = row.old[prop];
    switch (prefix) {
      case '#':
        val = `#${val}`
        break;
      case '%':
        val = `${val}%`;
        break;
      case '$':
        val = `$${accounting.format(val, { precision: Precise.usd(val) })}`;
        break;
      default:
        break;
    }
    
    return `Was ${val}`;
  }
}

export default DiffDescribe;