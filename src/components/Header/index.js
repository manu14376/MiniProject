import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'

import Popup from 'reactjs-popup'

import './index.css'

const Header = props => {
  const {history} = props

  const Logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <img
        src="https://res-console.cloudinary.com/dcpfzslnz/media_explorer_thumbnails/bc0d65b0edfe1a4ca6cb7d602a09d502/detailed"
        alt="website logo"
        className="logo"
      />
      <ul className="ul-list-features">
        <Link to="/" className="route-link">
          <li className="list-item">Home</li>
        </Link>
        <Link to="/shelf" className="route-link">
          <li className="list-item">Bookshelves</li>
        </Link>
        <li className="list-item">
          <button type="button" className="logout-btn" onClick={Logout}>
            Logout
          </button>
        </li>
      </ul>
      <div className="popup-container">
        <Popup
          modal
          trigger={
            <button type="button">
              <GiHamburgerMenu />
            </button>
          }
          position="top left"
        >
          {close => (
            <div className="popup-container">
              <ul className="ul-list-features-mobile">
                <Link to="/" className="route-link">
                  <li className="list-item">Home</li>
                </Link>
                <Link to="/shelf" className="route-link">
                  <li className="list-item">Bookshelves</li>
                </Link>
                <li className="list-item">
                  <button type="button" className="logout-btn" onClick={Logout}>
                    Logout
                  </button>
                </li>
                <li className="list-item">
                  <button
                    type="button"
                    className="cross-btn"
                    onClick={() => close()}
                  >
                    X
                  </button>
                </li>
              </ul>
            </div>
          )}
        </Popup>
      </div>
    </nav>
  )
}

export default withRouter(Header)
