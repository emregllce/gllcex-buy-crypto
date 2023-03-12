import "./CandleChart.css";
import { Browser } from "@syncfusion/ej2-base";
import ButtonGroup from "./ButtonGroup";
import * as React from "react";
import { useState } from "react";

import {
  AxesDirective,
  AxisDirective,
  ChartComponent,
  ColumnSeries,
  Crosshair,
  DateTime,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  DataLabel,
  Category,
  Tooltip,
  Zoom,
  CandleSeries,
  ScrollBar,
  IndicatorsDirective,
  IndicatorDirective,
  StripLine,
  Logarithmic,
  LineSeries,
  BollingerBands,
  MacdIndicator,
  RsiIndicator,
  RangeAreaSeries,
} from "@syncfusion/ej2-react-charts";
import { useQuery } from "react-query";
import axios from "axios";

const CandleChart = () => {

  const [interval, setInterval] = useState("1d")
  const handleClick = (e) =>{
    setInterval(e.target.innerHTML)
    refetch()
  } 
  const CandleData = () => {
    return axios.get(
      `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}`
    );
  };

  // interval = 1m 5m 15m 30m  1h 4h 1d 1w 1M
  const { isLoading, isError, error, data, refetch } = useQuery(
    "candledata", // unique querie key
    CandleData,
    {
      // refetchInterval: 2000
      enabled: false
    }
  );
  if (isLoading) {
    return <h4 style={{ textAlign: "center" }}>...</h4>;
  }

  if (isError) {
    return console.log(error);
  }



  const chartData = data?.data.slice(0,150).map((item) => ({
    x: parseFloat(item[0]),
    open: parseFloat(item[1]),
    high: parseFloat(item[2]),
    low: parseFloat(item[3]),
    close: parseFloat(item[4]),
  }));
  const chartarea = { border: { width: 0 } };
  const lines = { width: 0 };
  const animation = { enable: true };
  const upperline = { color: "#ffb735", width: 1 };
  const lowerline = { color: "#f2ec2f", width: 1 };
  const style = { textAlign: "center" };

  return (
    <div>
      <div className="chart-container">
        <ChartComponent
          id="charts2"
          crosshair={{ enable: true }}
          chartArea={chartarea}
          style={style}
          tooltip={{ enable: true, shared: true }}
          title="BTCUSDT"
          primaryXAxis={{
            valueType: "DateTime",
            crosshairTooltip: { enable: true },
          }}
          primaryYAxis={{
            opposedPosition: true,
            crosshairTooltip: { enable: true },
          }}
          zoomSettings={{
            enableMouseWheelZooming: true,
            // enableSelectionZooming:true,
            enableScrollbar: true,
            enablePan: true,
            toolbarItems: ["Reset"],
          }}
        >
          <Inject
            services={[
              CandleSeries,
              ColumnSeries,
              DateTime,
              DataLabel,
              Tooltip,
              Category,
              Crosshair,
              ScrollBar,
              Zoom,
              StripLine,
              Logarithmic,
              LineSeries,
              BollingerBands,
              MacdIndicator,
              RsiIndicator,
              RangeAreaSeries,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={chartData}
              xName="x"
              yName="y"
              name="BTCUSDT"
              type="Candle"
              low="low"
              high="high"
              open="open"
              close="close"
              volume="volume"
              animation={animation}
              bearFillColor="#2ecd71"
              bullFillColor="#e74c3d"
            ></SeriesDirective>
          </SeriesCollectionDirective>
          <IndicatorsDirective>
            <IndicatorDirective
              type="BollingerBands"
              field="Close"
              seriesName="BTCUSDT"
              fill="#606eff"
              period={14}
              animation={animation}
              upperLine={upperline}
              lowerLine={lowerline}
            ></IndicatorDirective>
          </IndicatorsDirective>
        </ChartComponent>
        <ButtonGroup handleClick={handleClick} />
        
      </div>
      <div>{/* <Rsi data={data} /> */}</div>
    </div>
  );
};

export default CandleChart;
