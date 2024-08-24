import { lazy, useContext, useState } from 'react';
import '../../styles/navigation/NavBar.css';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../network/redux/store/store';
import { calcCartSize } from './NavBarUtils';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import FavoriteIcon from '@mui/icons-material/Favorite';
import LockIcon from '@mui/icons-material/VpnKey';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { UserContext } from '../user/UserContext';
import { removeBackslash } from '../../utils/utils';

import IconSelector from '../icons/IconSelector';


const CartDrawer = lazy(() => import('../drawers/DrawerCart'));
export default function BottomBar() {

    const [state, setState] = useState<boolean>(false);
    const favs = useSelector((state: RootState) => state.persistedReducer.favs.favs);
    const cart = useSelector((state: RootState) => state.persistedReducer.cart.cart);
    const { user } = useContext<any>(UserContext);
    const dispatch = useDispatch();
    const accountButtonPath = user ? `/user/${user._id}` : '/login';


    function handleLoginAccountBtnName(string: string): string {
        const cleanedString = removeBackslash(string);

        if (cleanedString === 'Login') {
            return cleanedString
        } else {
            return 'Account'
        }

    }
    function handleLoginAccountIcon() {


        if (!user) {
            return <LockIcon className="nav-icon"/>
        } else {
            return <IconSelector icon="account" />
        }

    }
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        

        setState((
            open
        ));
    };
    return (
        <nav id='btmNav' className='bottom-bar col-12'>
            <ul className='bottom-bar-container'>
                <li className='bottom-bar-item'>

                    <button id='cart-btn' className='bottom-bar-link' onClick={() => { (setState(true)); }}>
                        <div className='nav-icon-link me-0'>
                            {/* <ShoppingCartIcon className='nav-icon' /> */}

                            <IconSelector icon='cart' />

                            <div className='icon-product-counter bottom'>
                                {calcCartSize(cart)}
                            </div>
                        </div>

                        <span className='bottom-bar-item-title'>Cart</span>
                    </button>
                </li>
                <li className='bottom-bar-item'>
                    <Link className='bottom-bar-link' to={accountButtonPath}>
                        <div className='nav-icon-link me-0'>
                            {handleLoginAccountIcon()}
                        </div>
                        <span className='bottom-bar-item-title'>{handleLoginAccountBtnName(accountButtonPath)}</span>
                    </Link>
                </li>
                <li className='bottom-bar-item'>
                    <Link className='bottom-bar-link' to={'/favorites'}>
                        <div className='nav-icon-link me-0'>

                            <FavoriteIcon className='nav-icon'/>
                            <div className='icon-product-counter bottom'>
                                {favs.length}
                            </div>
                        </div>

                        <span className='bottom-bar-item-title'>Favorites</span>
                    </Link>
                </li>
            </ul>
            <CartDrawer id='cart-bottom' direction='bottom' onClose={toggleDrawer(false)} open={state} />
        </nav>
    )
}