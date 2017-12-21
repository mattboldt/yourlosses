import 'whatwg-fetch';
import queryString from 'query-string'

const API_URL = 'https://api.coinmarketcap.com/v1/ticker/'

class Api {

  index(limit = 15) {
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
}

export default new Api();
