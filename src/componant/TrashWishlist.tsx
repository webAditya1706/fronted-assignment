import { wishlistAction } from '@/redux/actions/productActions'
import { productInterface } from '@/types/InterFace'
import React from 'react'
import { useDispatch } from 'react-redux'

interface props {
  product:productInterface;
  handleWishlist: (product:productInterface) => void;
}

const TrashWishlist = ({product,handleWishlist}:props) => {
  return (
            <div className='wishlist_round' onClick={()=>handleWishlist(product)} >
            <i className="bi bi-trash-fill" style={{color:"red"}}></i>
            </div>
  )
}

export default TrashWishlist