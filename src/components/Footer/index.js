import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <nav className="footer-section">
    <ul className="ul-list-footer-section">
      <li>
        <button type="button" className="icon-btn">
          <FaGoogle size={20} color="#3D3C3C" />
        </button>
      </li>
      <li>
        <button type="button" className="icon-btn">
          <FaTwitter size={20} color="#3D3C3C" />
        </button>
      </li>
      <li>
        <button type="button" className="icon-btn">
          <FaInstagram size={20} color="#3D3C3C" />
        </button>
      </li>
      <li>
        <button type="button" className="icon-btn">
          <FaYoutube size={20} color="#3D3C3C" />
        </button>
      </li>
    </ul>
    <h2 className="footer-text">Contact Us</h2>
  </nav>
)

export default Footer
