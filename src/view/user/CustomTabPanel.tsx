import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { fetchUserOrders } from '../../network/networkConfig';
import { UserContext } from './UserContext';
import { Order } from '../../utils/types';
import Orders from './Orders';
import Account from './Account';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

 

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='col-11 mx-auto'>
          <Tab label="Account" {...a11yProps(0)} />
          <Tab label="Orders" {...a11yProps(1)} />

        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Account />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
       <Orders/>
      </CustomTabPanel>

    </Box>
  );
}