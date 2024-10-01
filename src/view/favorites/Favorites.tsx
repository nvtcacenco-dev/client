import { useSelector } from 'react-redux';
import { RootState } from '../../network/redux/store/store';
import '../../styles/favorites/Favorites.css'
import ItemBrowser from '../items/ItemBrowser'

export default function Favorites() {
    const favs = useSelector((state: RootState) => state.persistedReducer.favs.favs);
    return (
        <div className='favorites-container d-flex justify-content-center'>
            <div className='favorites-item flex-column d-flex col-12 col-xxl-10'>
                <h1 >My Favorites</h1>
                {favs.length > 0 ? (<ItemBrowser products={favs} />):(<h2 id='no-favs-header'>There seems to be nothing here...</h2>)}
                
            </div>
        </div>
    )
}