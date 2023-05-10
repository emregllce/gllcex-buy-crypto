import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton({handleChange, alignment}) {
//   const [alignment, setAlignment] = React.useState('Spot');

//   const handleChange = (event, newAlignment) => {
//     setAlignment(newAlignment);
//   };

      return (
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          
        >
          <ToggleButton sx={{width :"100px"}} value="Spot">Spot</ToggleButton>
          <ToggleButton sx={{width :"100px"}} value="Future">Future</ToggleButton>
        </ToggleButtonGroup>
      );
  
}