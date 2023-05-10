import React from "react";
import ButtonGroup from "./ButtonGroup";
import Inputs from "./Inputs";
import "./Trade.css";

const Trade = () => {
    const [alignment, setAlignment] = React.useState('Spot');
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
      };
  return (
    <div className="trade">
      <div className="buttons">
        <ButtonGroup alignment={alignment} handleChange = {handleChange}/>
      </div>
      <div>
        <Inputs alignment={alignment}/>
      </div>
      <div></div>
    </div>
  );
};

export default Trade;
