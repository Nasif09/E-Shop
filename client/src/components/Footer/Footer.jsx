import React from 'react'
import './Footer.css'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import footer_logo from '../Assets/logo_big.png'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-logo">
            <Link to={'/'}><img src={footer_logo} alt="" /></Link>
            <Link to={'/'} style={{textDecoration:'none'}}><p>SHOPPER</p></Link>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icon-container">
                <img src={instagram_icon} alt="" />
            </div>
            <div className="footer-icon-container">
                <img src={pintester_icon} alt="" />
            </div>
            <div className="footer-icon-container">
                <img src={whatsapp_icon} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr/>
            <p>Copyright @ 2024 -= All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer
