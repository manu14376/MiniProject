import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  ChangeInUsername = event => {
    this.setState({username: event.target.value})
  }

  ChangeInPassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      const errorMsg = data.error_msg
      this.setState({errorMsg, showError: true})
    }
  }

  render() {
    const {username, password, errorMsg, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-image-container">
          <img
            src="https://res-console.cloudinary.com/dcpfzslnz/media_explorer_thumbnails/a85a6bf09a3edb0b1a7de3a64678550c/detailed"
            alt="website login"
            className="login-image"
          />
        </div>
        <div className="login-page">
          <form className="login-form" onSubmit={this.submitForm}>
            <img
              src="https://res-console.cloudinary.com/dcpfzslnz/media_explorer_thumbnails/bc0d65b0edfe1a4ca6cb7d602a09d502/detailed"
              alt="website logo"
              className="logo"
            />
            <label htmlFor="username" className="labelEl">
              Username*
            </label>
            <input
              type="text"
              id="username"
              className="inputEl"
              placeholder="Username"
              onChange={this.ChangeInUsername}
              value={username}
            />
            <label htmlFor="password" className="labelEl">
              Password*
            </label>
            <input
              type="password"
              id="password"
              className="inputEl"
              placeholder="Password"
              onChange={this.ChangeInPassword}
              value={password}
            />
            {showError && <p className="err-msg">{errorMsg}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
