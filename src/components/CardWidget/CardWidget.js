import React from 'react'
import { useCartContext } from '../Context/CartContext'
const CardWidget = () => {
  const { totalProducts, cart } = useCartContext();

    if(cart.length === 0) {
      return <i className="bi bi-cart3"></i>
    }
  return (
    <>
        <i className="bi bi-cart3"> { totalProducts() }</i>
    </>
  )
}

export default CardWidget;

