import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import ButtonGroup from "./ButtonGroup";
import "./Chart.css";

export const ChartComponent = (props) => {
  const {
    data,
    colors: {
      backgroundColor = "white",
      lineColor = "#2962FF",
      textColor = "black",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
  } = props;

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 350,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div ref={chartContainerRef} />;
};

export function MyApp(props) {
  const [interval, setInterval] = useState("1d");

  const handleClick = (e) => {
    setInterval(e.target.innerHTML);
    setTimeout(() => {
      refetch();
    }, 50);
  };
  const CandleData = () => {
    return axios.get(
      `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}`
    );
  };

  const { isLoading, isError, error, data, refetch } = useQuery(
    "candledata", // unique querie key
    CandleData
  );
  if (isLoading) {
    return <h4 style={{ textAlign: "center" }}>...</h4>;
  }

  if (isError) {
    return console.log(error);
  }
  // console.log(data);
  const initialData = data?.data.map((item) => ({
    time: item[0] / 1000,
    open: parseFloat(item[1]),
    high: parseFloat(item[2]),
    low: parseFloat(item[3]),
    close: parseFloat(item[4]),
  }));
  return (
    <div>
      <ChartComponent {...props} data={initialData}></ChartComponent>
      <ButtonGroup handleClick={handleClick} />
    </div>
  );
}
