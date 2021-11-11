import React from 'react';
import './Footer.css';
/*import { Button } from '../Button';*/
import { Link } from 'react-router-dom';
import Facebook from '@material-ui/icons/Facebook';
import Twitter from '@material-ui/icons/Twitter';
import YouTube from '@material-ui/icons/YouTube';
import Instagram from '@material-ui/icons/Instagram';

function Footer() {
  return (
    <div className='footer-container'>
      
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h6>About Us</h6>
            <Link to='/'>No 150, kks road,</Link>
            <Link to='/'>Chunnakam</Link>
            <Link to='/'>Pricing</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div class='footer-link-items'>
            <h6>Contact Us</h6>
            <Link to='/'>077 478 4376</Link>
            <Link to='/'>077 656 6873</Link>
            <Link to='/'>eutfurniture@gmail.com</Link>
            
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h6>Shop</h6>
            <Link to='/'>Chair</Link>
            <Link to='/'>Table</Link>
            <Link to='/'>Sofas</Link>
            <Link to='/'>Dining sets</Link>
            <Link to='/'>Bed</Link>
            
          </div>
          <div class='footer-link-items'>
            <h6>Social Media</h6>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              EUT FURNITURE
            </Link>
          </div>
          <small class='website-rights'>EUT FURNITURE © 2020</small>
          <div class='social-icons'>
         
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
          
              <Facebook />
              </Link>
          
            
       
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
             
             <Instagram />
             
            </Link>
           
           
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              
                <YouTube />
                </Link>
             
            
            
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
          
          <Twitter />
          </Link>
     
            
          
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;