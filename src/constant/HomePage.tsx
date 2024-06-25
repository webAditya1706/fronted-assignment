import PageWrapper from '@/componant/PageWrapper';
import { deleteProductAction, getAllProductAction, updateProductAction } from '@/redux/actions/productActions';
import React, { useCallback, useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './Pagination';
import { useRouter } from 'next/router';
import { productInterface } from '@/types/InterFace';

const HomePage = () => {
  const [editData, setEditData] = useState<productInterface | null>();
  const [editDataById, setEditDataById] = useState<number | null>(null);
  const [showData, setShowData] = useState<productInterface[] | null>();
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(3);
  const [indexNomber, setIndexNomber] = useState<number>(1);
  const [totalUser, setTotalUser] = useState<number>(0);
  const [renderUserNum, setRenderUserNum] = useState<number>(3);
  const router = useRouter()

  const dispatch = useDispatch();
  const { products } = useSelector(({ persistedReducer }: any) => persistedReducer.productReducer)
  console.log(products, "========products");

  const fetchData = useCallback(() => {
    dispatch(getAllProductAction() as any);
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const data = products.filter(
      (item: productInterface, index: number) => index < endIndex && index >= startIndex
    );
    setShowData(data);
  }, [startIndex, endIndex]);

  useEffect(() => {
    filterProducts();
  }, [products]);

  const filterProducts = () => {
    if (products.length > 0) {
      if (products.length % renderUserNum) {
        let totalIndex = Math.floor(products.length / renderUserNum) + 1;
        setTotalUser(totalIndex);
      } else {
        let totalIndex = products.length / renderUserNum;
        setTotalUser(totalIndex);
      }

      const data = products.filter(
        (item: productInterface, index: number) =>
          index < endIndex && index >= startIndex
      );
      setShowData(data);
    }
  }

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProductAction(id as string) as any);
  }


  return (
    <PageWrapper>
      <Col xs={12} className='py-4'>
        <h2 className='text-center'>Products</h2>
      </Col>
      {
        showData && showData.length > 0 && showData.map((product: any, index: number) => {
          return (
            <Col xs={12} md={4} key={index}>
              <div className='product_card mb-5'>
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
                  <div>
                    <button className='btn btn-primary' onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                    <button className='btn btn-primary' onClick={() => router.push(`product/${product._id}`)}>Edit</button>
                  </div>
                </div>
              </div>
            </Col>
          )
        })
      }
     {showData && showData.length > 3 && <Col xs={12} className='py-4'>
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

export default HomePage;
