import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export const Durationtabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', backgroundColor: '#F5DEB3', }}>
    <Tabs  value={value} onChange={handleChange} centered inkBarStyle={{background: 'red'}}>
      <Tab sx={{color:'black'}} color='error' label="Hourly" />
      <Tab sx={{color:'black'}}  label="Daily" />
      <Tab  sx={{color:'black'}} label="Weekly" />
    </Tabs>
  </Box>
  );
}
