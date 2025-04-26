import React from 'react';
import styles from './Footer.module.css';
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from './FooterIcons';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.left}>
          Omar Caiguan Webs &copy; Todos los derechos reservados
        </div>
        <div className={styles.right}>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <TikTokIcon />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <WhatsAppIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
