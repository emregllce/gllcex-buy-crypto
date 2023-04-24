import React from 'react'
import { useQuery } from "react-query";
import axios from "axios";
import "./MarketHistory.css"

const MarketHistory = () => {
  const MarketTrades = () => {
    return axios.get(`https://api.binance.com/api/v3/trades?symbol=BTCUSDT`);
  };

  const { isLoading, isError, error, data } = useQuery(
    "markethistory", // unique querie key
    MarketTrades,
    {
      // refetchInterval: 200
    }
  );
  if (isLoading) {
    return <h4 style={{ textAlign: "center" }}>...</h4>;
  }

  if (isError) {
    return console.log(`error`, error);
  }

console.log(data)
  return (
    <div className='page'>
      <div className="header">
        <div className="column" style={{ color: "black" }}>
          <p>Price(USDT)</p>
        </div>
        <div className="column1">
          <p>Amount(BTC)</p>
        </div>
        <div className="column1">
          <p>Time</p>
        </div>
      </div>
      {data?.data?.slice(0, 19).map((history) => (
        <div className="columns" key={history.id}>
          <div className="columnAsk">
            <p>{parseFloat(history.price).toFixed(2)}</p>
          </div>

          <div className="column1">
            <p>{parseFloat(history.qty).toFixed(4)}</p>
          </div>
          <div className="column1">
            <p>{parseFloat(history.time)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MarketHistory