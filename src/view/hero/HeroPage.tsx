import { Button, Skeleton } from '@mui/material';

import '../../styles/hero/HeroPage.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useState } from 'react';



import img4 from '../../resources/imgs/brand_otw.jpg'
import img5 from '../../resources/imgs/brand_otw_logo.jpg'

import ItemList from '../items/ItemList';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryID } from '../../network/redux/actions/actions';
import { RootState } from '../../network/redux/store/store';


import LoyaltyIcon from '@mui/icons-material/Loyalty';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { motion } from 'framer-motion';

import { Blurhash } from 'react-blurhash';
import ItemBrowser from '../items/ItemBrowser';
import { Product } from '../../utils/types';
import { fetchNewProducts } from '../../network/networkConfig';


export default function HeroPage() {

    const [isLoaded, setLoaded] = useState<boolean>(false);
    const [isLoadStarted, setLoadStarted] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);

    const categoryID = useSelector((state: RootState) => state.persistedReducer.category.categoryID);
    const dispatch = useDispatch();

    useEffect(() => {
        if (categoryID) {
            dispatch(setCategoryID(null));
        }

    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchNewProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    const handleLoad = () => {
        setLoaded(true);
    };

    const handleLoadStarted = () => {
        console.log("Started: ");
        setLoadStarted(true);
    };

    function handleZIndex() {
        const textElement = document.getElementById('title-text-wrapper');
        const scrollElement = document.getElementById('scroll-down-icon');
        if (textElement && scrollElement) {
            if (!isLoaded) {
                textElement.style.zIndex = '3'
                scrollElement.style.zIndex = '3'
            } else {
                textElement.style.zIndex = ''
                scrollElement.style.zIndex = ''
            }
        }
    }

    useEffect(() => {
        handleZIndex()
    }, [isLoaded])
    return (
        <div className='hero-page-content'>


            <section className='hero-section' aria-labelledby='section-title-1'>


                <img
                    className='hero-img'
                    onLoad={handleLoad}
                    loading="lazy"
                    src='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/hero_bg.webp?tr=w-1200'
                    srcSet={`https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/hero_bg.webp?tr=w-2000 1080w,
                            https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/hero_bg.webp?tr=w-1200 720w,
                            https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/hero_bg.webp?tr=w-800 480w,
                            https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/hero_bg.webp?tr=w-700 320w`}
                    alt=''
                />

                {!isLoaded && (
                    <Blurhash
                        className='hero-img-placeholder'
                        hash='LEIX,Ave~W4no#t,Rixu~WNeE1tR'
                        width={200}
                        height={200}
                        resolutionX={35}
                        resolutionY={35}
                    />
                )}

                <div id='title-text-wrapper' className="masked-text-wrapper">
                    {/* <p className="text-underneath ">Trend <br /> Thread</p> */}
                    <h1 id='section-title-1' className="text-default">Trend <br /> Thread</h1>

                </div>

                <Button id='scroll-down-icon' className='cta-scroll-down-icon-container d-flex justify-content-center align-items-center'>
                    <a href='#section-2'>
                        <ChevronRightIcon className='cta-chevron-icon' />
                    </a>

                </Button>
                <div className='cta-box position-absolute col-12 col-xl-10 col-xxl-9 d-flex justify-content-center align-items-center'>
                    <div className='col-6'>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } }}
                            viewport={{ once: true }}
                            className='cta-title'>
                            Spring <br /> Sale</motion.h2>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } }}
                            viewport={{ once: true }}
                            className=' bg-transparent'>
                            <LoyaltyIcon className='cta-icon' />
                        </motion.div>

                    </div>
                    <div className='col-6'>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } }}
                            viewport={{ once: true }}
                            className='cta-title'>
                            Trending <br /> Now</motion.h2>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } }}
                            viewport={{ once: true }}
                            className=' bg-transparent'>
                            <WhatshotIcon className='cta-icon' />
                        </motion.div>
                    </div>
                </div>




            </section>
            <section id='section-2' aria-labelledby='section-title-2'>

                <ul className='col-12 col-xl-12 d-flex justify-content-center align-items-center flex-wrap'>

                    <li className='col-12 col-md-4 position-relative'>
                        <Link className=' position-absolute w-100 h-100 z-1' to={'/catalog/spring'} />
                        <motion.div
                            initial={{ translateX: -400 }}
                            whileInView={{ translateX: 0, transition: { duration: 0.6 } }}
                            viewport={{ once: true }}>
                            New <br /> Arrivals
                        </motion.div>
                        <img
                            loading="lazy"
                            src='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_1.webp?tr=w-1200'
                            srcSet='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_1.webp?tr=w-1200 1080w,
                                    https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_1.webp?tr=w-900 720w,
                                    https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_1.webp?tr=w-700 480w,
                                    https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_1.webp?tr=w-500 320w'
                            alt='New Arrivals'
                        />


                    </li>
                    <li className='col-12 col-md-4 position-relative'>
                        <Link className=' position-absolute w-100 h-100 z-1' to={'/catalog/jackets'} />
                        <motion.div
                            initial={{ translateX: -400 }}
                            whileInView={{ translateX: 0, transition: { duration: 0.6 } }}
                            viewport={{ once: true }}>
                            Spring <br /> Jackets
                        </motion.div>
                        <img
                            loading="lazy"
                            src='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_2.webp?tr=w-1200'
                            srcSet='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_2.webp?tr=w-1200 1080w,
                                    https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_2.webp?tr=w-900 720w,
                                    https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_2.webp?tr=w-700 480w,
                                    https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_2.webp?tr=w-500 320w'
                            alt='Spring Jackets'
                        />
                    </li>
                    <li className='col-12 col-md-4 position-relative'>
                        <Link className=' position-absolute w-100 h-100 z-1' to={'/catalog/dresses'} />
                        <motion.div
                            initial={{ translateX: -400 }}
                            whileInView={{ translateX: 0, transition: { duration: 0.6 } }}
                            viewport={{ once: true }}>
                            Dresses
                        </motion.div>
                        <img
                            loading="lazy"
                            src='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_3.webp?tr=w-1200'
                            srcSet='https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_3.webp?tr=w-1200 1080w,
                                    https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_3.webp?tr=w-900 720w,
                                    https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_3.webp?tr=w-700 480w,
                                    https://ik.imagekit.io/nvtcacenco/Webshop/backgrounds/promo_3.webp?tr=w-500 320w'
                            alt='Dresses'
                        />
                    </li>
                    <Link to={'/catalog/spring'} className='spring-btn from-left'>
                        <div className='col-12' >
                            <h2 id='section-title-2'>
                                Our Spring Collection
                            </h2>

                        </div>
                    </Link>


                </ul>

            </section>
            <section aria-labelledby='section-title-3'>
                <h2 id='section-title-3'>Newest From Us</h2>

                <ItemList />

            </section>
            <section aria-labelledby='section-title-4'>
                <div className='d-flex justify-content-center align-items-center col-12 col-xxl-10 flex-wrap'>
                    <img src={img4} loading="lazy" className='botw-promo-img col-12 col-md-5' alt='brand of the week' />
                    <ul className='botw d-flex justify-content-center align-items-center flex-column col-12 col-md-7 col-xxl-5'>
                        <li className='botw-item'><h2 id='section-title-4'>Brand of the week</h2></li>
                        <li className='botw-item col-9'>
                            <img loading="lazy" className='botw-brand-title' src={img5} alt='brand of the week' /></li>
                        <li className='botw-item col-12'>
                            <Link className='botw-promo-link' to={'/catalog/brand-of-the-week'}>
                                <Button >Get it here</Button>
                            </Link>
                        </li>
                    </ul>

                </div>
            </section>

        </div>
    );
}