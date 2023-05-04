import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import "./Pairs.css";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import FavoriteIcon from "./FavoriteIcon";
import UsdtPairs from "./UsdtPairs";
import BtcPairs from "./BtcPairs";
import { useSelector, useDispatch } from "react-redux";
import { addToFav, removeFromFav } from "../redux/pairSlice";

const Pairs = () => {
  // const [favoritePair, setFavoritePair] = useState([]);
  const [pairType, setPairType] = useState("ALL");
  const usdtPair = [];
  const dispatch = useDispatch();
  const favoritePair = useSelector((state) => state.pair.favoritePairs);

  const headerItems = [
    <StarPurple500SharpIcon color="warning" />,
    "BTC",
    "USDT",
    "ALL",
  ];

  const chooseType = (e) => {
    setPairType(e.target.innerHTML.slice(-3));
  };
  const choosePair = (e) => {};

  const addFav = (e) => {
    if (
      favoritePair.includes(
        e.target.parentElement.parentElement.parentElement.children[1].innerHTML
      )
    ) {
      dispatch(
        removeFromFav(
          e.target.parentElement.parentElement.parentElement.children[1]
            .innerHTML
        )
      );
      e.target.checked = false;
    } else {
      dispatch(
        addToFav(
          e.target.parentElement.parentElement.parentElement.children[1]
            .innerHTML
        )
      );
      e.target.checked = true;
    }
  };
  // console.log(`favoritePair`, favoritePair);

  const PairInfo = () => {
    return axios.get(`https://api.binance.com/api/v3/ticker/24hr`);
  };

  const { isLoading, isError, error, data } = useQuery(
    "pairdata", // unique querie key
    PairInfo,
    {
      refetchInterval: 10000,
    }
  );
  if (isLoading) {
    return <h4 style={{ textAlign: "center" }}>...</h4>;
  }

  if (isError) {
    return console.log(`error`, error);
  }

  console.log(`favoritePair`, favoritePair);
  return (
    <div className="pairDiv">
      <div className="pairs">
        {headerItems.map((header) => (
          <p className="pair" key={header} onClick={chooseType}>
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
                  <div className="columns" key={pair.symbol}>
                    <div className="column" style={{ display: "flex" }}>
                      <p className="favorite " onClick={addFav}>
                        <FavoriteIcon symbol={pair.symbol}/>
                      </p>
                      <p className="choosePair" onClick={choosePair}>
                        {pair.symbol}
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
            return (
              <UsdtPairs
                data={data.data}
                addFav={addFav}
                choosePair={choosePair}
              />
            );
          } else if (pairType == "BTC") {
            return (
              <BtcPairs
                data={data.data}
                addFav={addFav}
                choosePair={choosePair}
              />
            );
          }
        })()}
      </div>
    </div>
  );
};

export default Pairs;
