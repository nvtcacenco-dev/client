import '../../styles/banner/PromotionBanner.css'

export default function PromotionBanner(){
    return(
        <ul className='promotion-banner col-12 d-flex justify-content-center align-items-center '>
                    <li className='col-4 col-xl-3'>Up to 20% on Dresses</li>
                    <li className='col-4 col-xl-3'>Use code SPRING24</li>
                    <li className='col-4 col-xl-3'>Free shipping over $60</li>
        </ul>
    )
}