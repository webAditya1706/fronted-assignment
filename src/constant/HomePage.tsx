import PageWrapper from '@/componant/PageWrapper';
import WishlistIcon from '@/componant/WishlistIcon';
import { getAllCartAction } from '@/redux/actions/cartAction';
import { deleteProductAction, getAllProductAction } from '@/redux/actions/productActions';
import { productInterface } from '@/types/InterFace';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './Pagination';

const HomePage = () => {
  const [showData, setShowData] = useState<productInterface[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(3);
  const [indexNomber, setIndexNomber] = useState<number>(1);
  const [totalUser, setTotalUser] = useState<number>(0);
  const [renderUserNum, setRenderUserNum] = useState<number>(3);
  const router = useRouter();

  const dispatch = useDispatch();
  const { products } = useSelector(({ persistedReducer }: any) => persistedReducer.productReducer);
  const { loginUserData } = useSelector(({ persistedReducer }: any) => persistedReducer.FormReducer.loginUser);

  const fetchData = useCallback(() => {
    dispatch(getAllProductAction() as any);
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (products && products.length > 0) {
      filterProducts();
    } else {
      setShowData([]);
    }
  }, [products, startIndex, endIndex]);

  const filterProducts = () => {
    if (products.length > 0) {
      const totalIndex = Math.ceil(products.length / renderUserNum);
      setTotalUser(totalIndex);

      if (startIndex >= products.length) {
        setStartIndex(Math.max(0, startIndex - renderUserNum));
        setEndIndex(Math.max(renderUserNum, endIndex - renderUserNum));
        setIndexNomber(totalIndex);
      }

      const data = products.slice(startIndex, endIndex);
      setShowData(data);
    } else {
      setShowData([]);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    await dispatch(deleteProductAction(id as string) as any);
    if(showData.length ===1){
      setIndexNomber(indexNomber - 1);
      setStartIndex(startIndex - renderUserNum);
      setEndIndex(endIndex - renderUserNum);
    }
    
  };

  const fetchCartData = useCallback(async () => {
    await dispatch(getAllCartAction() as any);
  }, [dispatch]);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  return (
    <PageWrapper>
      <Col xs={12} className='py-4'>
        <h2 className='text-center'>Products</h2>
      </Col>
      {showData && showData.length > 0 && showData.map((product: productInterface, index: number) => (
        <Col xs={12} md={4} key={index} className='position-relative'>
          {loginUserData?.role === "user" && <WishlistIcon product={product} />}
          <div className='product_card mb-5' >
            <div onClick={() => router.push(`product/${product._id}`)}>
              <img className='product_img' src={product.image} />
            </div>
            <div className='px-3 py-2'>
              <div className=''>
                <h4 className='product_title'>{product.title}</h4>
                <p className='product_price'>₹{product.price}</p>
              </div>
              {loginUserData && loginUserData?.role === "admin" && (
                <div className='d-flex justify-content-between'>
                  <button className='btn btn-primary' onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                  <button className='btn btn-primary' onClick={() => router.push(`updateproduct/${product._id}`)}>Edit</button>
                </div>
              )}
            </div>
          </div>
        </Col>
      ))}
      {products && products.length > 3 && (
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

export default HomePage;
