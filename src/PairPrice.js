import React from 'react'
import { useQuery } from "react-query";
import axios from "axios";

const PairPrice = () => {

    const PairPrice = () => {
        return axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT`);
      };
    
      const { isLoading, isError, error, data } = useQuery(
        "pairprice", // unique querie key
        PairPrice,
        {
          // refetchInterval: 20000,
        }
      );
      if (isLoading) {
        return <h4 style={{ textAlign: "center" }}>...</h4>;
      }
    
      if (isError) {
        return console.log(`error`, error);;
      }

  return (
    <div className='pairInfo'>
        <p className="pairSymbol">{data.data.symbol}</p>
        <p className="pairPrice">${parseFloat(data.data.price).toFixed(2)}</p>
    </div>
  );
}

export default PairPrice