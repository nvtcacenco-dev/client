import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../network/redux/store/store';
import '../../styles/favorites/Favorites.css'
import ItemBrowser from '../items/ItemBrowser'
import { Link } from 'react-router-dom';
import { addFav, setFavs, setProduct } from '../../network/redux/actions/actions';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { UserContext } from '../user/UserContext';
import { Product } from '../../types/types';
import { fetchProductByID, fetchUserFavorites } from '../../network/networkConfig';

export default function Favorites() {
    const { user, setUser } = useContext<any>(UserContext);
    const [userFavsList, setUserFavsList] = useState<Product[]>([]);
    const dispatch = useDispatch();
    function handleHyphens(name: string): string {
        return name.replace(/ /g, "-").toLowerCase();
    }
    const favs = useSelector((state: RootState) => state.persistedReducer.favs.favs);

  console.log(favs);
    
    return (
        <div className='favorites-container d-flex justify-content-center'>
            <div className='flex-column d-flex col-12 col-xxl-10'>
                <h1 >My Favorites</h1>

            
            <ItemBrowser products={favs}/>
            </div>
            

        </div>
    )
}