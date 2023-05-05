import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const PairPrice = () => {
  const selectedPair = useSelector((state) => state.pair.selectedPair);

  const PairPrice = () => {
    return axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${selectedPair}`
    );
  };

  const { isLoading, isError, error, data } = useQuery(
    "pairprice", // unique querie key
    PairPrice,
    {
      refetchInterval: 200,
    }
  );
  if (isLoading) {
    return <h4 style={{ textAlign: "center" }}>...</h4>;
  }

  if (isError) {
    return console.log(`error`, error);
  }

  return (
    <div className="pairInfo">
      <p className="pairSymbol">{data.data.symbol}</p>
      <p className="pairPrice">
        $
        {parseFloat(data.data.price) < 1
          ? parseFloat(data.data.price)
          : parseFloat(data.data.price).toFixed(2)}
      </p>
    </div>
  );
};

export default PairPrice;
