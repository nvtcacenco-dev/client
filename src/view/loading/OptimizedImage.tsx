import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../../styles/loading/OptimizedImage.css'
import { Skeleton } from '@mui/material';


interface OptimizedImageProps {
    uImage: { src: string; srcSet?: string; };
    hash?: string;
    id?: string;
    imgClassName?: string;
    containerClassName?: string;
    alt: string;
    onClick?: ()=> void;
}

export default function OptimizedImage({ uImage, hash, id, imgClassName, containerClassName, alt, onClick }: OptimizedImageProps) {
    const [isLoaded, setLoaded] = useState<boolean>(false);
    const [isLoadStarted, setLoadStarted] = useState<boolean>(false);

    const handleLoad = () => {
        setLoaded(true);
        
    };

    const handleLoadStarted = () => {
       
        setLoadStarted(true);
    };

    return (
        <div className={containerClassName ? (containerClassName):('optimized-img-container')} onClick={onClick}>
            <LazyLoadImage
                id={id}
                className={imgClassName ? (imgClassName):('optimized-img')}
                src={uImage.src}
                srcSet={uImage.srcSet}
                loading='lazy'
                alt={alt}
                onLoad={handleLoad}
                beforeLoad={handleLoadStarted}
               
            />
            {!isLoaded && isLoadStarted && (
               <div className={`blurhash-container ${containerClassName && (`${containerClassName} `)}`}>
                <Skeleton className={`blurhash-placeholder ${imgClassName && (`${imgClassName} `)}`} variant='rectangular' animation='wave' />
                </div>
            )}  
        </div>
    );
}
