import { React, useEffect, useState } from "react";
import { NavLink } from 'react-router-dom'
import './NavBar.css'
import CardWidget from '../CardWidget/CardWidget'
import { getFirestore, collection, getDocs } from 'firebase/firestore'


const NavBar = () => {
  const [loading, setLoading] = useState(true)
  const [categories, setCategory] = useState([])

  useEffect(() => {
    const querydb = getFirestore();
    const queryColletion = collection(querydb, 'categoriaMenu');

    getDocs(queryColletion)
    .then(res => {
      setLoading(false)
      setCategory(res.docs.map(producto => ({url: producto.id, ...producto.data() })))
    })
  }, [])

  if (loading) {
    return <></>
  }
  
  return (
    <div className='contenedor'>
      <NavLink to='/' className='Logo'><img src='https://i.imgur.com/OTDP62H.png' alt='LOGO' /></NavLink>

      <input type="checkbox" id="menu-bar"></input>
      <label htmlFor="menu-bar">menu</label>

      <nav className='navbar'>
        <ul>
          <li><NavLink to='/'>Inicio</NavLink></li>
          {
            categories.map((category) => (
              <li>
                <NavLink key={category.name} to={`/categoria/${category.url}`}>{category.name}</NavLink>
              </li>
            ))
          }
          <li><NavLink to='/cart'>
            <CardWidget />
          </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
