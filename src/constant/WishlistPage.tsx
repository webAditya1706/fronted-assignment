import PageWrapper from '@/componant/PageWrapper';
import TrashWishlist from '@/componant/TrashWishlist';
import { productInterface } from '@/types/InterFace';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './Pagination';

const WishlistPage = () => {
    const [showData, setShowData] = useState<productInterface[] | null>();
    const [startIndex, setStartIndex] = useState<number>(0);
    const [endIndex, setEndIndex] = useState<number>(3);
    const [indexNomber, setIndexNomber] = useState<number>(1);
    const [totalUser, setTotalUser] = useState<number>(0);
    const [renderUserNum, setRenderUserNum] = useState<number>(3);
    const router = useRouter()

    const dispatch = useDispatch();
    const { wishlist } = useSelector(({ persistedReducer }: any) => persistedReducer.productReducer);

    useEffect(() => {
        if(wishlist && wishlist.length){
            const data = wishlist.filter(
                (item: productInterface, index: number) => index < endIndex && index >= startIndex
            );
            setShowData(data);
        }
    }, [startIndex, endIndex, wishlist]);

    useEffect(() => {
        filterProducts();
    }, [wishlist, startIndex, endIndex]);

    const filterProducts = () => {
        if (wishlist && wishlist.length > 0) {
            if (wishlist.length % renderUserNum) {
                let totalIndex = Math.floor(wishlist.length / renderUserNum) + 1;
                setTotalUser(totalIndex);
            } else {
                let totalIndex = wishlist.length / renderUserNum;
                setTotalUser(totalIndex);
            }

            const data = wishlist.filter(
                (item: productInterface, index: number) =>
                    index < endIndex && index >= startIndex
            );
            setShowData(data);
        }
    }

    return (
        <PageWrapper>
            <Col xs={12} className='py-4'>
                <h2 className='text-center'>Products</h2>
            </Col>
            {
                showData && showData.length > 0 && showData.map((product: productInterface, index: number) => {
                    return (
                        <Col xs={12} md={4} key={index}>
                            <div className='product_card mb-5'>
                                <TrashWishlist product={product} />
                                <div>
                                    <img
                                        className='product_img'
                                        src={product.image} />
                                </div>
                                <div className='px-3 py-2'>
                                    <div className=''>
                                        <h4 className='product_title'>{product.title}</h4>
                                        <p className='product_price'>₹{product.price}</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )
                })
            }
            {wishlist && wishlist.length > 3 && <Col xs={12} className='py-4'>
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
            </Col>}
        </PageWrapper>
    );
};

export default WishlistPage;
