class Precise {
  usd(val) {
    if (val < 10) {
      return 6;
    } else if (val < 99) {
      return 5;
    } else if (val < 999) {
      return 4;
    } else if (val < 9999) {
      return 2;
    } else {
      return 1;
    }
  }
}

export default new Precise();

