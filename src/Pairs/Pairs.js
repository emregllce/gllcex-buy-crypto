import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import "./Pairs.css";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import FavoriteIcon from "./FavoriteIcon";
import UsdtPairs from "./UsdtPairs";
import BtcPairs from "./BtcPairs";

const Pairs = () => {
  // const btcPair = data?.data?.filter((pair)=>(
  //   pair.symbol.slice(-3) == "BTC"
  // ))
  const [favoritePair, setFavoritePair] = useState([]);
  const [pairType, setPairType] = useState("ALL");
  const usdtPair = [];

  const headerItems = [
    <StarPurple500SharpIcon color="warning" />,
    "BTC",
    "USDT",
    "ALL",
  ];

  const choosePair = (e) => {
    setPairType(e.target.innerHTML.slice(-3));
  };

  const PairInfo = () => {
    return axios.get(`https://api.binance.com/api/v3/ticker/24hr`);
  };

  const { isLoading, isError, error, data } = useQuery(
    "pairdata", // unique querie key
    PairInfo,
    {
      refetchInterval: 20000,
    }
  );
  if (isLoading) {
    return <h4 style={{ textAlign: "center" }}>...</h4>;
  }

  if (isError) {
    return console.log(`error`, error);
  }
// console.log(data.data)
  // console.log(`pairType`, pairType)
  return (
    <div className="pairDiv">
      <div className="pairs">
        {headerItems.map((header) => (
          <p className="pair" key={header} onClick={choosePair}>
            {header}
          </p>
        ))}
      </div>

      <div className="header" style={{ backgroundColor: "white" }}>
        <div className="column" style={{ color: "black" }}>
          <p>Pair</p>
        </div>
        <div className="column1">
          <p>Price</p>
        </div>
        <div className="column1">
          <p>Change</p>
        </div>
      </div>
      <div>
        {(() => {
          if (pairType == "ALL") {
            return (
              <div>
                {data?.data?.slice(0, 200).map((pair) => (
                  <div className="columns">
                    <div className="column" style={{ display: "flex" }}>
                      <p className="favorite">
                        <FavoriteIcon /> {pair.symbol}
                      </p>
                    </div>

                    <div className="column1">
                      <p>{pair.weightedAvgPrice}</p>
                    </div>
                    <div className="column1">
                      <p
                        className={
                          parseFloat(pair.priceChangePercent) <= 0
                            ? "redChange"
                            : "greenChange"
                        }
                      >
                        {parseFloat(pair.priceChangePercent)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            );
          } else if (pairType == "SDT") {
            return <UsdtPairs data={data.data} />;
          } else if (pairType == "BTC") {
            return <BtcPairs data={data.data} />;
          }
        })()}
      </div>
    </div>
  );
};

export default Pairs;

// else if (pairType == "SDT"){
//   return(
//     < UsdtPairs data = {data.data} headerItems={headerItems} choosePair={choosePair}/>
//   )
// } else if (pairType == "BTC"){
//   return(
//     < BtcPairs data = {data.data} headerItems={headerItems} choosePair={choosePair}/>
//   )
// }
