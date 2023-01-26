import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchCrypto = () => {
  // return axios.get(`https://fakestoreapi.com/products?limit=5`);
  // return axios.get(`https://api.binance.com/api/v3/exchangeInfo?limit=1`);
  return axios.get(
    `https://api.binance.com/api/v3/exchangeInfo?permissions=SPOT`
     // `https://api.binance.com/api/v3/ticker/price` ok
   //`https://api.binance.com/api/v3/depth?symbol=BTCUSDT` ok
  );
};
const Console = () => {

  const { isLoading, isError, error, data, refetch } = useQuery(
    "data", // unique querie key
    fetchCrypto,
    {
      //   refetchInterval: 2000,
    }
  );
  if (isLoading) {
    return <h4 style={{ textAlign: "center" }}>Loading...</h4>;
  }

  if (isError) {
    return (
      <h3 style={{ textAlign: "center" }}>
        Something went wrong please try again later...
      </h3>
    );
  }
  return (
      <div>
     {console.log(`data`, data)}
      {data?.data.symbols.slice(0,20).map((symboll) => (
        <div key={symboll.symbol}>
          <h4>{symboll.symbol}</h4>
        </div>
      ))}
    </div>
  );
};

export default Console;
