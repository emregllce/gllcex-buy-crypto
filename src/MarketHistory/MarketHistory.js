import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import "./MarketHistory.css";

const MarketHistory = () => {
  const MarketTrades = () => {
    return axios.get(`https://api.binance.com/api/v3/trades?symbol=BTCUSDT`);
  };

  const { isLoading, isError, error, data } = useQuery(
    "markethistory", // unique querie key
    MarketTrades,
    {
      refetchInterval: 200
    }
  );
  if (isLoading) {
    return <h4 style={{ textAlign: "center" }}>...</h4>;
  }

  if (isError) {
    return console.log(`error`, error);
  }

  console.log(data.data);
  return (
    <div className="page">
      <div className="header-head">
        <h4>Market Trades</h4>
      </div>
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
      {data?.data?.slice(0, 19).map((history) => {
        const date = new Date(history.time);
        const formattedTime = date.toLocaleTimeString("en-US", {
          timeZone: 'GMT',
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second:"2-digit"
        });
        // console.log(formattedTime);
        return (
          <div className="columns" key={history.id}>
            <div className="columnAsk">
              <p 
              className={
                history.isBuyerMaker == true
                ?"greenChange"
                :"redChange"
              }>
                {parseFloat(history.price).toFixed(2)}</p>
            </div>

            <div className="column1">
              <p>{parseFloat(history.qty).toFixed(4)}</p>
            </div>
            <div className="column1">
              <p>{formattedTime}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MarketHistory;
