"use strict"
import { placeorderAction, removeFromCartAction } from '@/redux/actions/cartAction';
import { CartInterface } from '@/types/InterFace';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const CartPage = () => {
    const { cart } = useSelector(({ persistedReducer }: any) => persistedReducer.cartReducer);
    const [totalAmt, setToatalAmt] = useState(0)

    const dispatch = useDispatch();
    const router = useRouter();

    const removeCart = (id: string) => {
        dispatch(removeFromCartAction((id) as string) as any);
    }

    useEffect(() => {
        let totalAmmount: any = 0;
        cart && cart.length > 0 && cart.map((item: CartInterface, index: number) => {
            let ammount = parseInt(item.product.price)
            setToatalAmt(totalAmmount += ammount)
        })
    }, [cart])

    const handlePlaceOrder = async () => {
        dispatch(placeorderAction() as any)
    }

    return (
        <section>
            <Container>
                <Row className='justify-content-center'>
                    <h2 className='text-center mt-5'>Cart Page</h2>
                    <Col xs={12} md={8}>

                        {cart && cart.length > 0 ?
                            <div className='cart_parent'>
                                {
                                    cart.map((item: CartInterface, index: number) => {
                                        return (
                                            <Row className='my-5 align-items-center justify-content-center'>
                                                <Col>
                                                    <img className='cart_img' src={item.product.image} />
                                                </Col>
                                                <Col>
                                                    <h4 className='product_title'>{item.product.title}</h4>
                                                    <p className='product_price'> Price ₹{item.product.price}</p>
                                                    <div className='cart_round' onClick={() => removeCart(item._id)} >
                                                        <i className="bi bi-trash-fill" style={{ color: "red" }}></i>
                                                    </div>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                                <div className='amount_container'>
                                    <div>
                                        <h4>Total Ammount:{totalAmt} </h4>
                                    </div>
                                    <div>
                                        <button className='btn btn-primary' onClick={handlePlaceOrder}>Place Order</button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className='no_data'>
                                <img src='/no_data.png' />
                                <h2>Data Not Found</h2>
                            </div>}
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default CartPage