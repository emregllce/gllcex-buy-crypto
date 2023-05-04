import React from "react";
import FavoriteIcon from "./FavoriteIcon";
import { useSelector, useDispatch } from "react-redux";
import { addToFav, removeFromFav } from "../redux/pairSlice";
import { useState } from "react";

const UsdtPairs = ({ data, addFav, choosePair }) => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const favoritePair = useSelector((state) => state.pair.favoritePairs);
  // const addFav = (e) => {
  //   if (
  //     favoritePair.includes(
  //       e.target.parentElement.parentElement.parentElement.children[1].innerHTML
  //     )
  //   ) {
  //     e.target.checked = false;
  //     dispatch(
  //       removeFromFav(
  //         e.target.parentElement.parentElement.parentElement.children[1]
  //           .innerHTML
  //       )
  //     );
  //   } else {
  //     e.target.checked = true;
  //     dispatch(
  //       addToFav(
  //         e.target.parentElement.parentElement.parentElement.children[1]
  //           .innerHTML
  //       )
  //     );
  //   }
  // };
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
