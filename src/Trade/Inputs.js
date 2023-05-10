import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function FormPropsTextFields({ alignment }) {
  const selectedPair = useSelector((state) => state.pair.selectedPair);
  const pairPrice = useSelector((state) => state.pair.pairPrice);
  const [myValue, setMyValue] = React.useState(pairPrice);
  console.log(typeof(pairPrice));
    // useEffect(() => {
    //   setTimeout(() => {
    //     refetch();
    //   }, 100);
    // }, [selectedPair]);
  const PairPrice2 = () => {
    return axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${selectedPair}`
    );
  };

  const { isLoading, isError, error, data, refetch } = useQuery(
    "pairprice2", // unique querie key
    PairPrice2
  );
  if (isLoading) {
    return <h4 style={{ textAlign: "center" }}>...</h4>;
  }

  if (isError) {
    return console.log(`error`, error);
  }

  if (alignment == "Spot") {
    return (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "42ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="formContainer">
          <div className="form leftForm">
            <TextField
            id="outlined-controlled"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Price</InputAdornment>
                ),
                sx: {
                  "& input": {
                    textAlign: "right",
                  },
                },
              }}
              sx={{
                "& .MuiInput-root": {
                  display: "flex",
                  flexDirection: "row-reverse",
                },
              }}
              value={myValue}
              onChange={(event) => {
                setMyValue(event.target.value);
              }}
              placeholder={
                data.data.symbol.slice(-3) == "SDT"
                  ? "USDT"
                  : data.data.symbol.slice(-3)
              }
            />

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Amount</InputAdornment>
                ),
                sx: {
                  "& input": {
                    textAlign: "right",
                  },
                },
              }}
              sx={{
                "& .MuiInput-root": {
                  display: "flex",
                  flexDirection: "row-reverse",
                },
              }}
              defaultValue="Hello World"
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Total</InputAdornment>
                ),
                sx: {
                  "& input": {
                    textAlign: "right",
                  },
                },
              }}
              sx={{
                "& .MuiInput-root": {
                  display: "flex",
                  flexDirection: "row-reverse",
                },
              }}
              defaultValue="Hello World"
            />
            <Button
              sx={{ width: "42ch", marginLeft: "10px" }}
              variant="contained"
              color="success"
            >
              BUY
            </Button>
          </div>
          <div className="form rightForm">
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Price</InputAdornment>
                ),
                sx: {
                  "& input": {
                    textAlign: "right",
                  },
                },
              }}
              sx={{
                "& .MuiInput-root": {
                  display: "flex",
                  flexDirection: "row-reverse",
                },
              }}
              defaultValue="Hello rrrr"
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Amount</InputAdornment>
                ),
                sx: {
                  "& input": {
                    textAlign: "right",
                  },
                },
              }}
              sx={{
                "& .MuiInput-root": {
                  display: "flex",
                  flexDirection: "row-reverse",
                },
              }}
              defaultValue="Hello rrrr"
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Total</InputAdornment>
                ),
                sx: {
                  "& input": {
                    textAlign: "right",
                  },
                },
              }}
              sx={{
                "& .MuiInput-root": {
                  display: "flex",
                  flexDirection: "row-reverse",
                },
              }}
              defaultValue="Hello rrrr"
            />
            <Button
              sx={{ width: "42ch", marginLeft: "10px" }}
              variant="contained"
              color="error"
            >
              SELL
            </Button>
          </div>
        </div>
      </Box>
    );
  }
}
