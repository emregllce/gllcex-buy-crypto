import React from "react";
import BidAsk from "./BidsAsks/BidAsk";
import "./Body.css";
import MarketHistory from "./MarketHistory/MarketHistory";
import Pairs from "./Pairs/Pairs";
import {MyApp} from "./CandleChart/TradingviewChart";
import Trade from "./Trade/Trade";

const Body = () => {
  return (
    <div className="main">
      <div className="left">
        <BidAsk />
      </div>
      <div className="center">
        < MyApp />
        < Trade />
      </div>
      <div className="right">
        <Pairs />
        <MarketHistory />
      </div>
    </div>
  );
};

export default Body;
