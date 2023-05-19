import React from 'react';
import './styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__column">
        <span>SharkSoft</span>
      </div>
      <div className="footer__column">
        <ul>
          <li><a href="/bottom/contact">Contact Us</a></li>
          <li><a href="/bottom/faq">FAQ</a></li>
          <li><a href="/bottom/sitemap">Sitemap</a></li>
        </ul>
      </div>
      <div className="footer__column">
        <ul>
          <li><a href="/bottom/privacy-policy">Privacy Policy</a></li>
          <li><a href="/bottom/terms-of-service">Terms of Service</a></li>
          <li><a href="/bottom/mission">Mission</a></li>
        </ul>
      </div>
      <div className="footer__column">
        <ul>
          <li><a href="/bottom/careers">Careers</a></li>
          <li><a href="/bottom/about-us">About Us</a></li>
          <li><a href="/bottom/cookies">Cookies</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
