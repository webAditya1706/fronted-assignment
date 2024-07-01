import PageWrapper from '@/componant/PageWrapper';
import TrashWishlist from '@/componant/TrashWishlist';
import { wishlistAction } from '@/redux/actions/productActions';
import { productInterface } from '@/types/InterFace';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './Pagination';

const WishlistPage = () => {
    const [showData, setShowData] = useState<productInterface[] | null>([]);
    const [startIndex, setStartIndex] = useState<number>(0);
    const [endIndex, setEndIndex] = useState<number>(3);
    const [indexNomber, setIndexNomber] = useState<number>(1);
    const [totalUser, setTotalUser] = useState<number>(0);
    const [renderUserNum, setRenderUserNum] = useState<number>(3);
    const router = useRouter();

    const dispatch = useDispatch();
    const { wishlist } = useSelector(({ persistedReducer }: any) => persistedReducer.productReducer);

    useEffect(() => {
        if (wishlist && wishlist.length) {
            filterProducts();
        } else {
            setShowData([]);
        }
    }, [wishlist, startIndex, endIndex]);

    const filterProducts = () => {
        if (wishlist && wishlist.length > 0) {
            const totalIndex = Math.ceil(wishlist.length / renderUserNum);
            setTotalUser(totalIndex);
            if (startIndex >= wishlist.length) {
                setStartIndex(Math.max(0, startIndex - renderUserNum));
                setEndIndex(Math.max(renderUserNum, endIndex - renderUserNum));
                setIndexNomber(totalIndex);
            }

            const data = wishlist.slice(startIndex, endIndex);
            setShowData(data);
        } else {
            setShowData([]);
        }
    };

    const handleWishlist = (product: productInterface) => {
        dispatch(wishlistAction(product as any) as any);
    };

    return (
        <PageWrapper>
            <Col xs={12} className='py-4'>
                <h2 className='text-center'>Products</h2>
            </Col>
            {
                showData && showData.length > 0 ? showData.map((product: productInterface, index: number) => (
                    <Col xs={12} md={4} key={index} className='position-relative'>
                        <TrashWishlist product={product} handleWishlist={handleWishlist} />
                        <div className='product_card mb-5' onClick={() => router.push(`product/${product._id}`)}>
                            <div className='cursor'>
                                <img className='product_img' src={product.image} alt={product.title} />
                            </div>
                            <div className='px-3 py-2'>
                                <div className=''>
                                    <h4 className='product_title'>{product.title}</h4>
                                    <p className='product_price'>₹{product.price}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))
                    :
                    <div className='no_data'>
                        <img src='/no_data.png' />
                        <h2>Data Not Found</h2>
                    </div>
            }
            {wishlist && wishlist.length > 3 && (
                <Col xs={12} className='py-4'>
                    <Pagination
                        indexNomber={indexNomber}
                        setIndexNomber={setIndexNomber}
                        totalUser={totalUser}
                        setStartIndex={setStartIndex}
                        setEndIndex={setEndIndex}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        renderUserNum={renderUserNum}
                        setRenderUserNum={setRenderUserNum}
                    />
                </Col>
            )}
        </PageWrapper>
    );
};

export default WishlistPage;
