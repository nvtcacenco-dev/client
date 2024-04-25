import { Button } from '@mui/material';

import '../../styles/hero/HeroPage.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect } from 'react';



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


export default function HeroPage() {
    const categoryID = useSelector((state: RootState) => state.persistedReducer.category.categoryID);
    const dispatch = useDispatch();
    useEffect(() => {
        if (categoryID) {
            dispatch(setCategoryID(null));
        }

    }, [])

    return (
        <div className='hero-page-content'>

           
            <section aria-labelledby='section-title-1'>
                <img className='hero-img' 
                    src='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/hero_bg.webp?tr=w-1200'
                    srcSet='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/hero_bg.webp?tr=w-2000 1080w,
                            https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/hero_bg.webp?tr=w-1200 720w,
                            https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/hero_bg.webp?tr=w-800 480w,
                            https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/hero_bg.webp?tr=w-700 320w'
                />
                <div className="masked-text-wrapper">
                    <h1 id='section-title-1' className="text-default">Trend <br/> Thread</h1>
                    <p className="text-underneath ">Trend <br/> Thread</p>
                </div>
                
                <Button className='cta-scroll-down-icon-container d-flex justify-content-center align-items-center'>
                    <ChevronRightIcon className='cta-chevron-icon' />
                </Button>
                <div className='cta-box position-absolute col-12 col-xl-10 col-xxl-9 d-flex justify-content-center align-items-center'>
                    <div className='col-6'>
                        <h2 className='cta-title'>Spring <br/> Sale</h2>
                        <LoyaltyIcon className='cta-icon' />
                    </div>
                    <div className='col-6'>
                        <h2 className='cta-title'>Trending <br/> Now</h2>
                        <WhatshotIcon className='cta-icon' />
                    </div>
                </div>

            </section>
            <section aria-labelledby='section-title-2'>

                <ul className='col-12 col-xl-12 d-flex justify-content-center align-items-center flex-wrap'>

                    <li className='col-12 col-md-4 position-relative'>
                        <Link className=' position-absolute w-100 h-100 z-1' to={'/catalog/spring'} />
                        <div>New <br/> Arrivals</div>
                        <img
                            src='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_1.webp?tr=w-1200'
                            srcSet='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_1.webp?tr=w-1200 1080w,
                                    https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_1.webp?tr=w-900 720w,
                                    https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_1.webp?tr=w-700 480w,
                                    https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_1.webp?tr=w-500 320w'
                        />
                    </li>
                    <li className='col-12 col-md-4 position-relative'>
                        <Link className=' position-absolute w-100 h-100 z-1' to={'/catalog/jackets'} />
                        <div>Spring <br/> Jackets</div>
                        <img
                            src='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_2.webp?tr=w-1200'
                            srcSet='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_2.webp?tr=w-1200 1080w,
                                    https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_2.webp?tr=w-900 720w,
                                    https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_2.webp?tr=w-700 480w,
                                    https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_2.webp?tr=w-500 320w'
                        />
                    </li>
                    <li className='col-12 col-md-4 position-relative'>
                        <Link className=' position-absolute w-100 h-100 z-1' to={'/catalog/dresses'} />
                        <div>Dresses</div>
                        <img
                            src='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_3.webp?tr=w-1200'
                            srcSet='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_3.webp?tr=w-1200 1080w,
                                    https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_3.webp?tr=w-900 720w,
                                    https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_3.webp?tr=w-700 480w,
                                    https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_3.webp?tr=w-500 320w'
                        />
                    </li>
                    <Button>
                        <Link className='w-100 h-100 position-absolute' to={'/catalog/spring'} />
                        <h2 id='section-title-2'>Our Spring Collection</h2>
                    </Button>


                </ul>

            </section>
            <section aria-labelledby='section-title-3'>
                <h2 id='section-title-3'>Newest From Us</h2>

                <ItemList />
            </section>
            <section aria-labelledby='section-title-4'>
                <div className='d-flex justify-content-center align-items-center col-12 col-xxl-10'>
                    <ul className='botw d-flex justify-content-center align-items-center flex-column col-7 col-xxl-5'>
                        <li className='botw-item'><h2 id='section-title-4'>Brand of the week</h2></li>
                        <li className='botw-item col-9'>
                            <img className='botw-brand-title' src={img5} /></li>
                        <li className='botw-item col-12'>
                            <Link className='botw-promo-link' to={'/catalog/brand-of-the-week'}>
                                <Button >Get it here</Button>
                            </Link>
                        </li>
                    </ul>
                    <img src={img4} className='botw-promo-img col-5' />
                </div>
            </section>

        </div>
    );
}