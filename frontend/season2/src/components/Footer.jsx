import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer__content">
          <div className="footer__mobile"><img src="/assets/footer/footer.gif" alt="" /></div>
          <div className="footer__pc"><img src="/assets/footer/footer-pc.gif" alt="" /></div>
        </div>
    </footer>
  );
};

export default Footer;
