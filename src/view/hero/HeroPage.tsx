import { Button} from '@mui/material';

import '../../styles/hero/HeroPage.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect} from 'react';



import img4 from '../../resources/imgs/brand_otw.jpg'
import img5 from '../../resources/imgs/brand_otw_logo.jpg'

import ItemList from '../items/ItemList';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryID } from '../../network/redux/actions/actions';
import { RootState } from '../../network/redux/store/store';


import LoyaltyIcon from '@mui/icons-material/Loyalty';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PromotionBannerAlt from '../banner/PromotionBannerAlt';

export default function HeroPage() {
    const categoryID = useSelector((state: RootState) => state.persistedReducer.category.categoryID);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(categoryID){
            dispatch(setCategoryID(null));
        }
        
    },[])
    
    return (
        <div className='hero-page-content'>
            
            {/* <Paper elevation={4}></Paper> */}
            <section aria-labelledby='section-title-1 z-1'>
                
                
                <h1 id='section-title-1' className='z-1'>Trend Thread</h1>
                <Button className='cta-scroll-down-icon-container d-flex justify-content-center align-items-center'>
                    <ChevronRightIcon className='cta-chevron-icon' />
                </Button>
                <div className='cta-box position-absolute col-12 col-xl-10 col-xxl-7 d-flex justify-content-center align-items-center'>
                    <div className='col-6'>
                        <h2 className='cta-title'>Spring <br/>Sale</h2>
                        <LoyaltyIcon className='cta-icon'/>
                    </div>
                    <div className='col-6'>
                        <h2 className='cta-title'>Trending Now</h2>
                        <WhatshotIcon className='cta-icon'/>
                    </div>
                </div>
                
            </section>
            <section>
                
                
                <ul className='col-12 col-xl-12 d-flex justify-content-center align-items-center flex-wrap'>
                        
                        <li className='col-12 col-md-4 position-relative'>
                            <Link className=' position-absolute w-100 h-100 z-1' to={'/catalog/spring'} onClick={(()=> dispatch(setCategoryID('65f479b3d7cb797decefeea0')))}/>
                            <div>New Arrivals</div>
                            <img 
                                src='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_1.webp?tr=w-1200'
                                srcSet='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_1.webp?tr=w-1200 1080w,
                                        https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_1.webp?tr=w-900 720w,
                                        https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_1.webp?tr=w-700 480w,
                                        https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_1.webp?tr=w-500 320w' 
                            />
                        </li>
                        <li className='col-12 col-md-4 position-relative'>
                            <Link className=' position-absolute w-100 h-100 z-1' to={'/catalog/jackets'} onClick={(()=> dispatch(setCategoryID('65f479cdd7cb797decefeea2')))}/>
                            <div>Spring Jackets</div>
                            <img 
                                src='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_2.webp?tr=w-1200'
                                srcSet='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_2.webp?tr=w-1200 1080w,
                                        https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_2.webp?tr=w-900 720w,
                                        https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_2.webp?tr=w-700 480w,
                                        https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_2.webp?tr=w-500 320w' 
                            />
                        </li>
                        <li className='col-12 col-md-4 position-relative'>
                            <Link className=' position-absolute w-100 h-100 z-1' to={'/catalog/dresses'} onClick={(()=> dispatch(setCategoryID('65f479a2d7cb797decefee9e')))}/>
                            <div>Dresses</div>
                            <img 
                                src='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_3.webp?tr=w-1200'
                                srcSet='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_3.webp?tr=w-1200 1080w,
                                        https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_3.webp?tr=w-900 720w,
                                        https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_3.webp?tr=w-700 480w,
                                        https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_3.webp?tr=w-500 320w' 
                            />
                        </li>
                        <Button onClick={(()=> dispatch(setCategoryID('65f479b3d7cb797decefeea0')))}>
                            <Link className='w-100 h-100 position-absolute' to={'/catalog/spring'} />
                            <h2>Our Spring Collection</h2>
                        </Button>
                        
                        
                </ul>
                
            </section>
            <section>
                <h2>Newest From Us</h2>

                <ItemList/>
            </section>
            <section>
                

                <div className='d-flex justify-content-center align-items-center col-12 col-xxl-10'>
                        <ul className='botw d-flex justify-content-center align-items-center flex-column col-7 col-xxl-5'>
                            <li className='botw-item'><h2>Brand of the week</h2></li>
                            <li className='botw-item col-9'><img src={img5}/></li>
                            <li className='botw-item col-12'><Link  to={'/catalog/brand-of-the-week'} onClick={()=> dispatch(setCategoryID("65f479d6d7cb797decefeea3"))}><Button >Get it here</Button></Link></li>
                        </ul>
                        <img src={img4} className='col-5'/>
                </div>
            </section>
            
        </div>
    );
}