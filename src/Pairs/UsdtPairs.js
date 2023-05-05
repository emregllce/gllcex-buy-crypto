import React from "react";
import FavoriteIcon from "./FavoriteIcon";
import { useSelector, useDispatch } from "react-redux";

const UsdtPairs = ({ data, addFav, choosePair }) => {
  const searchPairs = useSelector((state) => state.pair.searchPairs);
  
  return (
    <div>
      {data
        ?.filter((usdtPair) => usdtPair.symbol.slice(-3) == "SDT")
        .map((pair) => (
          <div className="columns" key={pair.symbol}>
            <div className="column" style={{ display: "flex" }}>
              <p className="favorite " onClick={addFav}>
                <FavoriteIcon symbol={pair.symbol} />
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

export default UsdtPairs;
