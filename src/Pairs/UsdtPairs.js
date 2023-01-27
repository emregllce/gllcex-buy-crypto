import React from "react";
import FavoriteIcon from "./FavoriteIcon";

const UsdtPairs = ({ data, headerItems, choosePair }) => {
  return (
      <div>
        {data
          ?.filter((usdtPair) => usdtPair.symbol.slice(-3) == "SDT")
          .map((pair) => (
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
};

export default UsdtPairs;
