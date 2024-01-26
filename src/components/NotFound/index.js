import {withRouter} from 'react-router-dom'

import './index.css'

const NotFound = props => {
  const {history} = props

  const backToHome = () => {
    history.replace('/')
  }

  return (
    <div className="notfound-container">
      <img
        src="https://res-console.cloudinary.com/dcpfzslnz/media_explorer_thumbnails/f682ce34906c3fd20ec69cf7d18a0bea/detailed"
        alt="not found"
        className="notfound-img"
      />
      <h1 className="notfound-heading">Page Not Found</h1>
      <p className="notfound-description">
        we are sorry, the page you requested could not be found, Please go back
        to the homepage.
      </p>
      <button type="button" className="back-to-home-btn" onClick={backToHome}>
        Go Back To Home
      </button>
    </div>
  )
}

export default withRouter(NotFound)
