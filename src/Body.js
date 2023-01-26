import React from "react";
import BidAsk from "./BidAsk";
import "./Body.css";
import CandleChart from "./CandleChart";
import MarketHistory from "./MarketHistory";
import Pairs from "./Pairs";

const Body = () => {
  return (
    <div className="main">
      <div className="left">
        {" "}
        <BidAsk />{" "}
      </div>
      <div className="center">
        {" "}
        <CandleChart />{" "}
      </div>
      <div className="right">
        < Pairs />
        < MarketHistory />
      </div>
    </div>
  );
};

export default Body;
