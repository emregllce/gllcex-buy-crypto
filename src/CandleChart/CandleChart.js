import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Category,
  Tooltip,
  Zoom,
  Crosshair,
  CandleSeries,
} from "@syncfusion/ej2-react-charts";
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";


const CandleChart = () => {

  const CandleData = () => {
    return axios.get(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d`);
  };

  // interval = 1m 5m 15m 30m  1h 4h 1d 1w 1M
  const { isLoading, isError, error, data } = useQuery(
    "candledata", // unique querie key
    CandleData,
    {
      // refetchInterval: 2000
    }
  );
  if (isLoading) {
    return <h4 style={{ textAlign: "center" }}>...</h4>;
  }

  if (isError) {
    return <h1>error</h1>;
  }

// console.log(data.data)

  // const chartData = [
  //   { x: "Jan", open: 120, high: 160, low: 100, close: 140 },
  //   { x: "Feb", open: 150, high: 190, low: 130, close: 170 },
  //   { x: "Mar", open: 130, high: 170, low: 110, close: 150 },
  //   { x: "Apr", open: 160, high: 180, low: 120, close: 140 },
  //   { x: "May", open: 150, high: 170, low: 110, close: 130 },
  // ];

  const chartData = data?.data.map((item)=>({
    x:parseFloat(item[0]),
    open:parseFloat(item[1]),
    high:parseFloat(item[2]),
    low:parseFloat(item[3]),
    close:parseFloat(item[4])
  }))
  
  const primaryxAxis = {
    valueType: "Category",
    majorGridLines: { width: 0 },
  };
  const primaryyAxis = {
    minimum: chartData[499].open / 2,
    maximum: chartData[499].open * 2 ,
    interval: chartData[499].open / 10,
  };
  const style = { textAlign: "center" };
  const legendSettings = { visible: true };

  return (
    <div className="chart-container">
      <ChartComponent
        id="charts"
        style={style}
        primaryXAxis={primaryxAxis}
        primaryYAxis={primaryyAxis}
        legendSettings={legendSettings}
        title="Shirpur Gold Refinery Share Price"
      >
        <Inject services={[CandleSeries, Tooltip, Category, Crosshair, Zoom]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={chartData}
            xName="x"
            yName="low"
            name="SHIRPUR-G"
            type="Candle"
            low="low"
            high="high"
            open="open"
            close="close"
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
      
    </div>
  );
};

export default CandleChart;

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
// import React from "react";
// import { data } from "../data";

//  const CandleChart = () => {
//   return (
//     <div className="chart-container">
//        <ChartComponent
//           title="Sales Analysis"
//           primaryXAxis={{ valueType: "Category", title: "Month" }}
//           primaryYAxis={{ title: "Sales" }}
//           legendSettings={{ visible: true }}
//           tooltip={{ enable: true }}
//         >
//           <Inject
//             services={[LineSeries, Category, Legend, DataLabel, Tooltip]}
//           ></Inject>
//           <SeriesCollectionDirective>
//             <SeriesDirective
//               type="Line"
//               dataSource={data}
//               xName="month"
//               yName="sales"
//               name="Sales"
//               marker={{ dataLabel: { visible: true }, visible: true }}
//             ></SeriesDirective>
//           </SeriesCollectionDirective>
//         </ChartComponent>
//     </div>
//   );
// };

// export default CandleChart;
