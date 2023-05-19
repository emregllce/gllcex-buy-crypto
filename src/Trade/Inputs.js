import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  addToFav,
  setPrice,
  removeFromFav,
  selectPair,
} from "../redux/pairSlice";

export default function FormPropsTextFields({ alignment }) {
  const dispatch = useDispatch();
  const selectedPair = useSelector((state) => state.pair.selectedPair);
  const pairPrice = useSelector((state) => state.pair.pairPrice);
  const [myValue, setMyValue] = useState(pairPrice);
  const [userBValue, setUserBValue] = useState(0);
  const [userSValue, setUserSValue] = useState(0);
  const [amountB, setAmountB] = useState(0)
  const [amountS, setAmountS] = useState(0)
  const [totalB, setTotalB] = useState(0)
  const [totalS, setTotalS] = useState(0)

  useEffect(() => {
    setMyValue(pairPrice);
    setUserBValue(0);
    setUserSValue(0);
    setAmountB(0)
    setAmountS(0)
    setTotalB(0)
    setTotalS(0)
  }, [pairPrice]);

  useEffect(() => {
    setTotalB((userBValue ? userBValue : myValue) * amountB)
  }, [amountB, userBValue ])

  useEffect(() => {
    setTotalS((userSValue ? userSValue : myValue) * amountS)
  }, [amountS, userSValue ])
  

  const handleChangeB = (e) => {
    setAmountB(e.target.value)
  }
  const handleChangeS = (e) => {
    setAmountS(e.target.value)
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
              // value={
              //   selectedPair.slice(-3) === "SDT"
              //     ? myValue + " " + "USDT"
              //     : myValue + " " + selectedPair.slice(-3)
              // }
              value={userBValue 
                ? userBValue 
                : myValue
              }
              onChange={(e) => setUserBValue(e.target.value)}
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
              value = {amountB}
              onChange={handleChangeB}
              placeholder="0"
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
              value={totalB}
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
              value={userSValue 
                ? userSValue 
                : myValue
              }
              onChange={(e) => setUserSValue(e.target.value)}
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
              value = {amountS}
              onChange={handleChangeS}
              placeholder="0"
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
              value={totalS}
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
