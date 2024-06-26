import { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Blurhash } from 'react-blurhash';
import { encode } from 'blurhash';

import '../../styles/loading/OptimizedImage.css'
import { Skeleton } from '@mui/material';


interface OptimizedImageProps {
    uImage: { src: string; srcSet?: string; };
    hash?: string;
    id?: string;
    imgClassName?: string;
    containerClassName?: string;
    onClick?: ()=> void;
}

export default function OptimizedImage({ uImage, hash, id, imgClassName, containerClassName,  onClick }: OptimizedImageProps) {
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const [isLoadStarted, setLoadStarted] = useState<boolean>(false);
   

    

    const handleLoad = () => {
        setLoaded(true);
        
    };

    const handleLoadStarted = () => {
       
        setLoadStarted(true);
    };

    
    /* const handleOpacity = () =>{
        const imgElement = document.getElementById(id);
        if (imgElement ) {
            if (!isLoaded) {
                imgElement.style.opacity = '0'
                
            }else{
                imgElement.style.opacity = '1'
                
            } 
            console.log('img found')
        }
        console.log('img not found')
    }

    useEffect(() =>{
        handleOpacity();
    },[isLoaded])   */
   /*  <Blurhash
                    className='blurhash-placeholder'
                    hash={hash}
                    width={200}
                    height={200}
                    resolutionX={35}
                    resolutionY={35}
                /> */
    return (
        <div className={containerClassName ? (containerClassName):('optimized-img-container')} onClick={onClick}>
            <LazyLoadImage
                id={id}
                className={imgClassName ? (imgClassName):('optimized-img')}
                src={uImage.src}
                srcSet={uImage.srcSet}
                loading="lazy"
                onLoad={handleLoad}
                beforeLoad={handleLoadStarted}
               
            />
            {!isLoaded && isLoadStarted && (
               <div className={`blurhash-container ${containerClassName && (`${containerClassName} `)}`}>
                <Skeleton className={`blurhash-placeholder ${imgClassName && (`${imgClassName} `)}`} variant="rectangular" animation="wave" />
                </div>
            )}  
            
            {/* <div className={`blurhash-container ${containerClassName && (`${containerClassName} `)}`}>
                <Skeleton className={`blurhash-placeholder ${imgClassName && (`${imgClassName} `)}`} variant="rectangular" animation="wave" />
                </div> */}
        </div>
    );
}
