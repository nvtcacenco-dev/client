import { Carousel } from 'react-bootstrap';
import { forwardRef, useContext, useEffect, useState } from 'react';
import '../../../styles/clothing/SingleItemPage.css';
import CustomBreadCrumbs from '../../misc/CustomBreadCrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../network/redux/store/store';

import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';

import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Button, Collapse, IconButton, MenuItem } from '@mui/material';

import Accordion from '@mui/material/Accordion';

import FavoriteIcon from '@mui/icons-material/Favorite';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addFav, addToCart, setProduct } from '../../../network/redux/actions/actions';

import { calculateDiscountedPrice, getStringAfterAmpersand } from '../../../utils/utils';
import { useLocation } from 'react-router-dom';
import { fetchProductByID, manageFavourites } from '../../../network/networkConfig';
import OptimizedImage from '../../loading/OptimizedImage';
import { Product, valuta } from '../../../utils/types';
import { UserContext } from '../../user/UserContext';
import CustomFavButton from '../../misc/CustomFavButton';
import { useWindowResize } from '../../../hooks/WindowResizeHook';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction='up' ref={ref} {...props} />;
});

export default function SingleItem() {
    const product = useSelector((state: RootState) => state.persistedReducer.product.product);
    const [validImages, setValidImages] = useState<string[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [openFeedbackError, setOpenFeedbackError] = useState<boolean>(false);
    const [openFeedbackSuccess, setOpenFeedbackSuccess] = useState<boolean>(false);
    const [successTimer, setSuccessTimer] = useState<NodeJS.Timeout | null>(null);
    const [expandedImgURL, setExpandedImgURL] = useState<string>('');
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [size, setSize] = useState<string>('Size');

    const favs = useSelector((state: RootState) => state.persistedReducer.favs.favs);
    const { user } = useContext<any>(UserContext);

    const location = useLocation();
    const pathname = location.pathname;

    const dispatch = useDispatch();

    const handleClickOpen = (url: string) => {
        if (windowWidth > 576) {
            setOpen(true);
            setExpandedImgURL(url);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setExpandedImgURL('');
    };

    useEffect(() => {
        async function getProduct() {
            const productID = getStringAfterAmpersand(pathname);
            const product = await fetchProductByID(productID)
            dispatch(setProduct(product))
        }
        getProduct()
    }, [pathname])

    const handleSizesExpand = () => {
        if (expanded) {
            setExpanded(false)
        } else {
            setExpanded(true)
        }
    }

    const handleAddToCart = () => {
        if (product) {
            if (size !== 'Size') {
                dispatch(addToCart({ product: product, size: size }))
                setOpenFeedbackError(false);
                setExpanded(false);
                setOpenFeedbackSuccess(true);

                const timer = setTimeout(() => {
                    setOpenFeedbackSuccess(false);
                }, 2000);
                setSuccessTimer(timer);
            } else {
                setOpenFeedbackError(true)
                setOpenFeedbackSuccess(false);
            }

        }
    }

    const handleCloseSuccessAlert = () => {
        setOpenFeedbackSuccess(false);
        if (successTimer) {
            clearTimeout(successTimer);
        }
    }

    const priceMap = () => {
        if (product) {
            const map = product.Discount > 0 ?
                (<span>
                    <span className='discount-former'>
                        {`${product.Price} ${valuta}`}
                    </span>
                    <span className='discount-current ms-2'>
                        {`${calculateDiscountedPrice(product.Price, product.Discount).toFixed(2)} ${valuta}`}
                    </span>
                </span>)
                : (`${product.Price} ${valuta}`)
            return map
        }
    }

    const lgMap = validImages.map((imageUrl, index) => (
        <OptimizedImage
            uImage={{
                src: `${imageUrl}`,
                srcSet: `${imageUrl}?tr=w-1000 1080w,
                ${imageUrl}?tr=w-700 720w,
                ${imageUrl}?tr=w-600 480w,
                ${imageUrl}?tr=w-500 320w`
            }}
            alt={`${imageUrl}-${index}`}
            containerClassName='col-6 pe-2 pb-2 position-relative'
            imgClassName='single-item-img col-12'
            onClick={(() => { (handleClickOpen(`${imageUrl.split('?')[0]}?tr=w-1280`)); })}
        />
    ));

    const carouselMap = validImages.map((imageUrl, index) => (
        <Carousel.Item key={index}>
            <OptimizedImage
                uImage={{
                    src: `${imageUrl}`,
                    srcSet: `${imageUrl}?tr=w-1000 1080w,
                ${imageUrl}?tr=w-700 720w,
                ${imageUrl}?tr=w-600 480w,
                ${imageUrl}?tr=w-500 320w`
                }}
                alt={`${imageUrl}-${index}`}
                containerClassName='col-12 position-relative h-100'
                imgClassName='single-item-img col-12'
                onClick={(() => { (handleClickOpen(`${imageUrl.split('?')[0]}?tr=w-1280`)); })}
            />
        </Carousel.Item>
    ));

    const sizesMap = product?.Size.map((size, index) => (
        <MenuItem key={index} value={size.toUpperCase()} onClick={() => (setSize(size.toUpperCase()), setOpenFeedbackError(false))}>{size.toUpperCase()}</MenuItem>
    ));

    useEffect(() => {
        let backgroundImageSet = false;
        function setBackgroundImage() {
            if (!backgroundImageSet && windowWidth <= 1200) {
                const carouselIndicators = document.querySelectorAll<HTMLButtonElement>('.carousel-indicators button');
                if (carouselIndicators.length > 0 && validImages.length > 0) {
                    carouselIndicators.forEach((button, index: number) => {
                        var bgImg = new Image();
                        bgImg.src = `${validImages[index]}?tr=w-50`
                        bgImg.onload = () => {
                            button.style.backgroundImage = `url(${bgImg.src})`;
                        }
                    });
                    backgroundImageSet = true;
                }
            }
        }
        setBackgroundImage();
        return () => {
            backgroundImageSet = false;
        };
    }, [validImages, windowWidth]);

    useEffect(() => {
        function checkValidImages() {
            const validImageUrls = [];
            const baseUrl = product?.imageURL;
            if (baseUrl) {
                for (let i = 1; i <= product.imgsNr; i++) {
                    const imageUrl = `${baseUrl}/${i}.webp`;
                    validImageUrls.push(imageUrl + '?tr=w-700');
                }
            }
            setValidImages(validImageUrls);
        }
        checkValidImages();
    }, [product]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function handleAddRemoveFromFavs(product: Product, userID: string) {
        dispatch(addFav(product));
        if (user) {
            manageFavourites(userID, product._id);
        }
    }
    return (
        <div className='singleItem-page-container col-12 d-flex flex-column align-items-center '>
            <div id='singleItem-page-wrap' className='col-12 col-lg-10'>
                <CustomBreadCrumbs />
                <div className='singleItem-container d-flex justify-content-center align-items-start col-12 flex-wrap'>
                    <div className='singleItem-imgs-container d-flex justify-content-start d-flex flex-wrap col-12 col-md-7 col-lg-6 col-xl-7   '>
                        {windowWidth <= 1200 ?
                            (<Carousel
                                interval={null}
                                data-bs-theme='dark'
                                className='h-100 col-12'
                                controls={false}
                            >
                                {carouselMap}
                            </Carousel>) :
                            (lgMap)}
                    </div>
                    <div className='singleItem-info-container col-12 col-md-5 col-lg-6 col-xl-5 px-0 px-md-3 px-xxl-0 d-flex align-items-center flex-column '>
                        <div id='singleItem-info-wrapper' className='col-12 col-lg-12 col-xxl-8'>
                            <div className='singleItem-info-description d-flex flex-column col-12'>
                                <p className='col-12 '>{priceMap()}</p>
                                <p className='col-12 '>{product?.Name}</p>
                                <p className='col-12 '>{product?.Brand.toUpperCase()}</p>
                                <CustomFavButton product={product} userID={user ? user._id : null} user={user} favs={favs} className='singleItem' handleAddRemoveFromFavs={handleAddRemoveFromFavs} />
                            </div>
                            <p className='color-txt-field col-12 '>Color: <span>{product?.Color}</span></p>
                            <Accordion id='size-accordion' className='single-item-info-accordion col-12 ' expanded={expanded} onClick={handleSizesExpand}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon className='expand-icon' />}

                                    aria-controls='panel1-content'
                                    id='panel1-header'
                                >
                                    {size}
                                </AccordionSummary>
                                <AccordionDetails>
                                    {sizesMap}

                                </AccordionDetails>
                            </Accordion>
                            <Collapse in={openFeedbackError}>
                                <Alert
                                    className='error-alert'
                                    severity='error'
                                    action={
                                        <IconButton
                                            aria-label='close'
                                            color='inherit'
                                            size='small'
                                            onClick={() => {
                                                setOpenFeedbackError(false);
                                            }}
                                        >
                                            <CloseIcon fontSize='inherit' />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                >
                                    Please select a size.
                                </Alert>
                            </Collapse>
                            <Button className='add-to-cart-btn col-12 ' onClick={handleAddToCart} endIcon={<AddShoppingCartIcon />}>Add to cart</Button>
                            <Collapse in={openFeedbackSuccess}>
                                <Alert
                                    className='success-alert'
                                    severity='success'
                                    action={
                                        <IconButton
                                            aria-label='close'
                                            color='inherit'
                                            size='small'
                                            onClick={handleCloseSuccessAlert}
                                        >
                                            <CloseIcon fontSize='inherit' />
                                        </IconButton>
                                    }
                                    sx={{ mb: 2 }}
                                >
                                    Product added to your cart.
                                </Alert>
                            </Collapse>
                            <Accordion className='single-item-info-accordion col-12 '>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon className='expand-icon' />}
                                    aria-controls='panel1-content'
                                    id='panel1-header'
                                >
                                    Product Description
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='single-item-info-accordion col-12 '>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon className='expand-icon' />}
                                    aria-controls='panel2-content'
                                    id='panel2-header'
                                >
                                    Product Details
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='single-item-info-accordion col-12 '>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon className='expand-icon' />}
                                    aria-controls='panel2-content'
                                    id='panel2-header'
                                >
                                    Shipping Details
                                </AccordionSummary>
                                <AccordionDetails>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </div>
                {windowWidth < 577 ?
                    (<></>)
                    :
                    (<Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby='alert-dialog-slide-description'
                        className='m-0'
                        disableScrollLock={true}
                    >
                        <DialogContent className='dialog-content p-0 m-0'>
                            <OptimizedImage imgClassName='preview-img' uImage={{ src: expandedImgURL }} alt={`${expandedImgURL}`} />

                            <IconButton className='dialog-close-btn' aria-label='close-preview' onClick={() => { (handleClose()); }}>
                                <CloseIcon fontSize='small' />
                            </IconButton>
                        </DialogContent>
                    </Dialog>)
                }

            </div>

        </div>
    );
}
