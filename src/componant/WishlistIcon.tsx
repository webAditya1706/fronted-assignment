import { wishlistAction } from '@/redux/actions/productActions';
import { productInterface } from '@/types/InterFace';
import { useDispatch, useSelector } from 'react-redux';

const WishlistIcon = ({ product }: any) => {
    const { wishlist } = useSelector(({ persistedReducer }: any) => persistedReducer.productReducer);
    const dispatch = useDispatch()
    const handleWishlist = () => {
        dispatch(wishlistAction(product as productInterface) as any)
    }
    let isWishlist;
    if (wishlist && wishlist.length) {
        isWishlist = wishlist.some((productItem: productInterface) => productItem._id === product._id)
    }

    return (
            <div className='wishlist_round' onClick={handleWishlist} >
                {
                    isWishlist ?
                        <i className="bi bi-suit-heart-fill wishlist_active"></i>
                        :
                        <i className="bi bi-suit-heart-fill wishlist"></i>
                }
            </div>
    )
}

export default WishlistIcon