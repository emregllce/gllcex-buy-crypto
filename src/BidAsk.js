import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import "./BidAsk.css";
import PairPrice from "./PairPrice";

const BidAsk = () => {
  const BidsAsks = () => {
    return axios.get(`https://api.binance.com/api/v3/depth?symbol=BTCUSDT`);
  };

  const { isLoading, isError, error, data } = useQuery(
    "bidask", // unique querie key
    BidsAsks,
    {
      // refetchInterval: 20000,
    }
  );
  if (isLoading) {
    return <h4 style={{ textAlign: "center" }}>Loading...</h4>;
  }

  if (isError) {
    return (
      <h3 style={{ textAlign: "center" }}>
        Something went wrong please try again later...
      </h3>
    );
  }
  return (
    <div className="page">
      <div className="header">
        <div className="column" style={{ color: "black" }}>
          <p>Price(USDT)</p>
        </div>
        <div className="column1">
          <p>Amount(BTC)</p>
        </div>
        <div className="column1">
          <p>Total</p>
        </div>
      </div>

      {data?.data?.bids.slice(81, 100).map((bid) => (
        <div className="columns">
          <div className="column">
            <p>{parseFloat(bid[0]).toFixed(2)}</p>
          </div>

          <div className="column1">
            <p>{parseFloat(bid[1]).toFixed(2)}</p>
          </div>
          <div className="column1">
            <p>{parseFloat(bid[0] * bid[1]).toFixed(2)}</p>
          </div>
        </div>
      ))}
      <div className="pair">
        < PairPrice />
      </div>
      {data?.data?.asks.slice(81, 100).map((ask) => (
        <div className="columns">
          <div className="columnAsk">
            <p>{parseFloat(ask[0]).toFixed(2)}</p>
          </div>

          <div className="column1">
            <p>{parseFloat(ask[1]).toFixed(2)}</p>
          </div>
          <div className="column1">
            <p>{parseFloat(ask[0] * ask[1]).toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BidAsk;
