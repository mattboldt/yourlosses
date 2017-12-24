import 'whatwg-fetch';
import queryString from 'query-string'
import MockData from './mock_data/mock-response.json';

const API_URL = 'https://api.coinmarketcap.com/v1/ticker/';

class Api {

  index(limit = 15) {

    if (window.location.href === 'http://localhost:3000/?mock') {
      return this.mockIndex();
    }

    const params = {
      limit: limit
    };

    return new Promise(function(resolve, reject) {
      fetch(`${API_URL}?${queryString.stringify(params)}`)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          resolve(json);
        })
        .catch(function(ex) {
          reject(ex);
        });
    });
  }

  mockIndex() {
    return new Promise(function(resolve, reject) {
      const mocks = [MockData[0], MockData[1], MockData[2]];
      const mock = mocks[Math.floor(Math.random()*mocks.length)];
      return resolve(mock);
    });
  }
}

export default new Api();
