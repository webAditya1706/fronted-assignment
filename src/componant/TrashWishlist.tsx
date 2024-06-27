import { wishlistAction } from '@/redux/actions/productActions'
import { productInterface } from '@/types/InterFace'
import React from 'react'
import { useDispatch } from 'react-redux'

const TrashWishlist = ({product}:any) => {
    const dispatch = useDispatch()

    const handleWishlist = () => {
        dispatch(wishlistAction(product as productInterface) as any)
    }
  return (
    <div className='position-relative'>
            <div className='wishlist_round' onClick={handleWishlist} >
            <i className="bi bi-trash-fill" style={{color:"red"}}></i>
            {/* <i className="bi bi-trash" style={{color:"red"}}></i> */}
            </div>
        </div>
  )
}

export default TrashWishlist