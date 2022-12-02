import React from 'react'
import './Item.css'
import { Link } from "react-router-dom";


const Item = ( {info} ) => {
  return (
    <div>
      <Link className='item-list' to={`/detalle/${info.id}`}>
        <img className='imagen' src={ info.img } alt='' />
        <p>{ info.title }</p>
        <p>${info.price}</p>
        <button className='ver'>Ver Mas Detalles</button>
      </Link>
    </div>
  )
}

export default Item



