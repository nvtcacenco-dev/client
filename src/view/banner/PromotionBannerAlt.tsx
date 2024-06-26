import { useSelector } from 'react-redux';
import { RootState } from '../../network/redux/store/store';
import '../../styles/banner/PromotionBanner.css'

export default function PromotionBannerAlt() {
    const drawerState = useSelector((state: RootState) => state.drawerStatus.state);
    return (
        <ul style={{
            width: `calc(100% - ${drawerState ? (window.innerWidth - document.documentElement.clientWidth) : (0)}px)`
        }} id='promo-banner' className='promotion-banner-alt col-12 d-flex justify-content-center align-items-center '>
            <li className='col-4 col-xl-3'>
                <p>
                    Up to 20% on Dresses
                </p>

            </li>

        </ul>
    )
}