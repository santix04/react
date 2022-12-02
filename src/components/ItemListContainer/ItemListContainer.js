import React, { useState, useEffect } from 'react'
import ItemList from '../ItemList/ItemList'
import Title from '../Title/Title'
import { useParams } from "react-router-dom";
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore'



const ItemListContainer = () => {
  const [data, setData] = useState([]);
  let greeting = 'Estos son nuestros productos'
  const {categoriaId} = useParams();


  useEffect(() => {
    const querydb = getFirestore();
    let queryColletion = collection(querydb, 'products');

    if (categoriaId) {
      queryColletion = query(queryColletion, where('categoria', '==', categoriaId))
    }

    getDocs(queryColletion)
    .then(res => setData(res.docs.map(producto => ({id: producto.id, ...producto.data() }))))
  }, [categoriaId]);

  return (
    <>
      <Title greeting={ greeting }/>
      <div id="div-cont">
        <ItemList data={data}  />
      </div>
    </>
  )
}

export default ItemListContainer
