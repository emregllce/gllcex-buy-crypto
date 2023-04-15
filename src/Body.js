// import {
//   Category,
//   ChartComponent,
//   DataLabel,
//   Inject,
//   Legend,
//   LineSeries,
//   SeriesCollectionDirective,
//   SeriesDirective,
//   Tooltip,
// } from "@syncfusion/ej2-react-charts";
import React from "react";
import BidAsk from "./BidsAsks/BidAsk";
import "./Body.css";
import CandleChart from "./CandleChart/CandleChart";

import MarketHistory from "./MarketHistory/MarketHistory";
import Pairs from "./Pairs/Pairs";
import {MyApp} from "./CandleChart/TradingviewChart";

const Body = () => {
  return (
    <div className="main">
      <div className="left">
        <BidAsk />
      </div>
      <div className="center">
        {/* <CandleChart /> */}
        {/* < Trading /> */}
        {/* <LightTrading /> */}
        < MyApp />
       
      </div>
      <div className="right">
        <Pairs />
        <MarketHistory />
      </div>
    </div>
  );
};

export default Body;
