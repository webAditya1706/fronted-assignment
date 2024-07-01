import PageWrapper from '@/componant/PageWrapper';
import { addTocartAction, removeFromCartAction } from '@/redux/actions/cartAction';
import { getProductFullDetail, wishlistAction } from '@/redux/actions/productActions';
import { productInterface } from '@/types/InterFace';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const ProductDescription = () => {
    const { cart } = useSelector(({ persistedReducer }: any) => persistedReducer.cartReducer);
    const { wishlist } = useSelector(({ persistedReducer }: any) => persistedReducer.productReducer);
    const [product, setProduct] = useState<productInterface | null>(null); // Initialize as null
    const [isWishlist, setIsWishlist] = useState(false);
    const [isCart, setIsCart] = useState<{} | boolean>(false);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (router.query.id) {
            getProductDetail();
        }
    }, [router.query.id]);

    useEffect(() => {
        if (product) {
            setIsWishlist(wishlist.some((item: productInterface) => item._id === product._id));
            setIsCart(cart.find((item: any) => item.product._id === product._id));
        }
    }, [product, wishlist, cart]);

    const getProductDetail = async () => {
        const Data = await dispatch(getProductFullDetail(router.query.id as string) as any);
        if (Data) {
            setProduct(Data.payload);
        }
    }

    const handleWishlist = () => {
        dispatch(wishlistAction(product as productInterface) as any);
    };

    const handleCart = () => {
        if (isCart) {
            dispatch(removeFromCartAction((isCart as any)._id as string) as any);
        } else {
            dispatch(addTocartAction(product as productInterface) as any);
        }
    };

    return (
        <PageWrapper>
            {product ? (
                <>
                    <Col xs={12} md={6} className="mt-5">
                        <img className="product_des_img" src={product.image} alt={product.title} />
                    </Col>
                    <Col xs={12} md={6} className="mt-5 d-flex">
                        <div className="product_discription">
                            <h3 className="product_title">{product.title}</h3>
                            <p>{product.description}</p>
                            <p className="product_price">Price: ₹{product.price}</p>
                            <div className="handle_btn_group">
                                <button className="btn btn-primary" onClick={handleWishlist}>
                                    {isWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                                </button>
                                <button className="btn btn-primary" onClick={handleCart}>
                                    {isCart ? 'Remove from Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </Col>
                </>
            ) : (
                <div>Data Not Found</div>
            )}
        </PageWrapper>
    );
};

export default ProductDescription;
