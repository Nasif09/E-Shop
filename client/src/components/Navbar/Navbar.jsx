import React, { useContext, useState,useRef } from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'

const Navbar = () => {
  const {getTotalCartItems} = useContext(ShopContext);
  const [ menu, setMenu ] = useState("shop");
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  return (
    <div className="navbar">
        <div className="nav-logo">
            <Link to={'/'}><img src={logo} alt="" /></Link>
            <Link to={'/'} style={{textDecoration:'none'}}><p>SHOPPER</p></Link>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className='nav-menu'>
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop" ? <hr/> : <></>}</li>
            <li onClick={()=>{setMenu("men")}}><Link style={{textDecoration: 'none'}} to='/men'>Men</Link>{menu==="men" ? <hr/> : <></>}</li>
            <li onClick={()=>{setMenu("women")}}><Link style={{textDecoration: 'none'}} to='/women'>Women</Link>{menu==="women" ? <hr/> : <></>}</li>
            <li onClick={()=>{setMenu("kid")}}><Link style={{textDecoration: 'none'}} to='/kid'>Kids</Link>{menu==="kid" ? <hr/> : <></>}</li>
        </ul>
        <div className="nav-login-cart">
          {localStorage.getItem('auth-token')
          ? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
          : <Link to='/login'><button>Login</button></Link>
          }
            <Link to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar
