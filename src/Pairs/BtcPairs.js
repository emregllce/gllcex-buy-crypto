import React from "react";
import FavoriteIcon from "./FavoriteIcon";
import { useSelector, useDispatch } from "react-redux";
import { addToFav, removeFromFav } from "../redux/pairSlice";

const BtcPairs = ({ data, addFav, choosePair }) => {
  const dispatch = useDispatch();
  const favoritePair = useSelector((state) => state.pair.favoritePairs);
  return (
    <div>
      {data
        ?.filter((btcPair) => btcPair.symbol.slice(-3) == "BTC")
        .map((pair) => (
          <div className="columns" key={pair.symbol}>
            <div className="column" style={{ display: "flex" }}>

              <p className="favorite " onClick={addFav}>
                <FavoriteIcon />
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
};

export default BtcPairs;
