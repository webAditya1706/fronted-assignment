"use strict"
import { getAllCartAction } from '@/redux/actions/cartAction';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CartPage = () => {
    const {cart} = useSelector(({persistedReducer}:any) =>persistedReducer.cartReducer);
    console.log(cart,"================allCartData  ");
    
    const dispatch = useDispatch();
    const router = useRouter();

    const fetchCartData = useCallback( async ()=> {
        const cartData = await dispatch(getAllCartAction() as any)
        console.log(cartData,"=================cartData");        
     },[dispatch])

    useEffect(() => {
        fetchCartData()
    },[fetchCartData])
   
  return (
    <div>CartPage</div>
  )
}

export default CartPage