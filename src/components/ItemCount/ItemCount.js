import './ItemCount.css';

import React, { useState } from 'react';

const ItemCount = ( {initial, stock, onAdd} ) => {
  const [count, setCount] = useState(initial);

  const decrease = () => {
    setCount(count - 1);
  }

  const increase = () => {
    setCount(count + 1);
  }

  return (
    <div className='counter'>
      <button className='decrement' onClick={decrease} disabled={count === initial}>-</button>
      <span>{count}</span>
      <button className='increment' onClick={increase} disabled={count === stock}>+</button>
      <div className="wrap">
        <button disabled={stock <= 0} onClick={() => onAdd(count)} className='agregar'>Agregar al Carrito</button>
      </div>
    </div>
  )
}

export default ItemCount