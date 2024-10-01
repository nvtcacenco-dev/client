import { useContext, useEffect } from 'react';
import { UserContext } from './UserContext';
import '../../styles/user/UserDashboard.css'
import BasicTabs from './CustomTabPanel';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearPersistedState } from '../../network/redux/actions/actions';
import { clearPersistedStateAndRestart } from '../../network/redux/store/store';
import Orders from './Orders';
import OptimizedImage from '../loading/OptimizedImage';

export default function UserDashboard() {
    const { user, setUser } = useContext<any>(UserContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignOut = async () => {
        setUser(null);
        localStorage.removeItem('token');
        dispatch(clearPersistedState());
        clearPersistedStateAndRestart();

        navigate(`/`);
        window.location.reload();
    }
    const imgSrcSet = 'https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/user_banner.webp?tr=w-1500 1080w, https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/user_banner.webp?tr=w-900 720w, https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/user_banner.webp?tr=w-600 480w, https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/user_banner.webp?tr=w-500 360w'

    return (
        <section aria-labelledby='account-label' className='user-section'>
            <div className='user-container '>
                <div id='account-banner' className='d-flex justify-content-center align-items-center mb-4'>

                    <OptimizedImage
                        uImage={{ src: 'https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/user_banner.webp?tr=w-1080', srcSet: imgSrcSet}}
                        alt='user banner'
                    />
                    <div className='p-4 d-flex justify-content-center align-items-center z-1'>
                        <h1 id='account-label' className='mb-0'>Welcome back {user.firstName}!</h1>
                    </div>

                </div>

                <BasicTabs />

                
            </div>

        </section>


    )
}