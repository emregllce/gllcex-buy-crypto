import React from 'react'
import FavoriteIcon from "./FavoriteIcon";
import { useSelector, useDispatch } from "react-redux";


const FavPairs = ({data, addFav, choosePair}) => {
  const favoritePair = useSelector((state) => state.pair.favoritePairs);

  return (
    <div>
      {data?.filter((favPair) => favoritePair.includes(favPair.symbol)).map((pair)=>(
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
  )
}

export default FavPairs