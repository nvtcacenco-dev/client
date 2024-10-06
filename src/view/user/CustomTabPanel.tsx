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
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearPersistedState } from '../../network/redux/actions/actions';
import { clearPersistedStateAndRestart } from '../../network/redux/store/store';

import LogoutIcon from '@mui/icons-material/Logout';

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
  const { user, setUser } = React.useContext<any>(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleSignOut = async () => {

    setUser(null);
    localStorage.removeItem('token');
    dispatch(clearPersistedState());
    clearPersistedStateAndRestart();

    navigate(`/`);
    window.location.reload();
  }


  return (
    <Box sx={{ width: '66.66%', fontSize: 'var(--fs-xs)', marginInline: 'auto'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs sx={{ marginBottom: 'calc(12px + 1vw)' }} value={value} onChange={handleChange} aria-label="basic tabs example" className='col-11 mx-auto'>
          <Tab sx={{ fontSize: 'var(--fs-base)' }} label="Orders" {...a11yProps(0)} />
          <Tab sx={{ fontSize: 'var(--fs-base)' }} label="Account" {...a11yProps(1)} />
          <Button  className='sign-out-btn ms-auto' onClick={handleSignOut} endIcon={<LogoutIcon />}>
            Sign Out
          </Button>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Orders />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Account />
      </CustomTabPanel>


    </Box>
  );
}