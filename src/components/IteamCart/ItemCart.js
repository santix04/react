import React from 'react'
import { useCartContext } from '../Context/CartContext'

const ItemCart = ( { product } ) => {
  const { removeItem } = useCartContext();
  return (
    <div>
          <div className='cart-item'>
            <img src= { product.img } alt={ product.title }/>
            <p>Titulo: { product.title }</p>
            <p>Cantidad: { product.cantidad }</p>
            <p>Precio U: { product.price }</p>
            <p>Subtotal: ${ product.cantidad * product.price }</p>
            <button onClick={() => removeItem(product.id)}>Eliminar</button>
          </div>
    </div>
  )
}

export default ItemCart