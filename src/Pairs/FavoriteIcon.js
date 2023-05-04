import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarPurple500SharpIcon from '@mui/icons-material/StarPurple500Sharp';
import { useSelector, useDispatch } from "react-redux";


const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function FavoriteIcon({ symbol }) {
  const favoritePair = useSelector((state) => state.pair.favoritePairs);

  return (
      <Checkbox sx={{ padding:"0"}}
        {...label}
        icon={<StarBorderIcon sx={{height:"15px"}} />}
        checkedIcon={<StarPurple500SharpIcon color="warning" sx={{height:"17px"}} />}
        checked = {favoritePair.includes(symbol) && true }
        // checked={symbol}
      />
    
  );
}
