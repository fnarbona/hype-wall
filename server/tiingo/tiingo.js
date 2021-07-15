//websocket for market data
const WebSocket = require('ws');
var wsTiingo = new WebSocket('wss://api.tiingo.com/iex');

async function tiingoData(){
    var subscribe = {
      'eventName':'subscribe',
      'authorization':'5816aa9a26d33b4b7d58eb2f03f128934816847e',
      'eventData': {
        'thresholdLevel': 5,
        'tickers': ['tsla', 'appl', 'mu']
      }
    }
  
    wsTiingo.on('open', function open() {
      wsTiingo.send(JSON.stringify(subscribe));
    });
  
    wsTiingo.on('message', function(data, flags) {
        console.log(data);
        io.sockets.emit('message', data);
    });
  };

async function tiingoDaily() {
    var data = await Axios.get('https://api.tiingo.com/iex/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 5816aa9a26d33b4b7d58eb2f03f128934816847e'
        }
      })
      .then(result => {
        const data = result.data.slice(0,100);
        console.log(data ? 'data retrieved' : 'nothing here');
        return data;
      });
    
      return data
}

module.exports = { tiingoData, tiingoDaily }