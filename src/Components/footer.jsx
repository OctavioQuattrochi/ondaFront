import React from 'react';
import '../Styles/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a href="https://www.instagram.com/" className="instagram-link" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram Logo" className="instagram-logo" />
        </a>
        <div className="footer-text">Onda Estudio</div>
      </div>
    </footer>
  );
}

export default Footer;
