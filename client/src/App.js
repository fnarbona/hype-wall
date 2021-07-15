import React, {useEffect, useState} from 'react';
import logo from './hype-wall-logo.png';
import './App.css';
import axios from 'axios';
import io from 'socket.io-client';
// const ws = new WebSocket('ws://localhost:5000');

function App() {
  // const [count, setCount] = useState(0)
  const [stocks, setStocks] = useState([]);

  useEffect(() => { 
    // ws.onopen = () => console.log('connected');
    // ws.onmessage = (e) => console.log(e.data);
    // ws.onclose = () => console.log('disconnected');
    const socket = io();
    socket.on('connect', () => {
      console.log('client socket connected');
    })

    socket.on('message', (data) => {
      console.log(data);
    })

    // axios.get('/api/hello')
    // .then(res => {
    //   console.log(res.data)
    //   setStocks(res.data)
    // });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="App-Main">
        <div className="container">
        {stocks.map((item, i) => (
          <div key={i} className="stock-ticker">
            <p>{item.ticker}</p>
            <p>{item.prevClose}</p>
          </div>
        ))}
        </div>
      </main>
    </div>
  );
}

export default App;
