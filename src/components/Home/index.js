import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Loader from 'react-loader-spinner'

import SlickItem from '../SlickItem'

import Header from '../Header'

import Footer from '../Footer'

import './index.css'

const apiStatusObj = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    booksData: [],
    apiStatus: apiStatusObj.initial,
  }

  componentDidMount() {
    this.getResults()
  }

  getResults = async () => {
    this.setState({apiStatus: apiStatusObj.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.books.map(each => ({
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        title: each.title,
      }))
      this.setState({booksData: updatedData, apiStatus: apiStatusObj.success})
    } else {
      this.setState({apiStatus: apiStatusObj.failure})
    }
  }

  renderLoader = () => (
    <div className="home-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSlider = () => {
    const settings = {
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
    }
    const {booksData} = this.state
    return (
      <Slider {...settings}>
        {booksData.map(each => (
          <SlickItem key={each.id} details={each} />
        ))}
      </Slider>
    )
  }

  renderFailure = () => (
    <div className="home-failure-container">
      <img
        src="https://res-console.cloudinary.com/dcpfzslnz/media_explorer_thumbnails/3a1f0a623f11490486aab4ad37fdcd6c/detailed"
        alt="failure"
        className="home-failure-img"
      />
      <h1 className="home-failure-heading">
        Something went wrong, please try again.
      </h1>
      <button
        type="button"
        className="home-tryagain-btn"
        onClick={this.getResults}
      >
        Try Again
      </button>
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusObj.inProgress:
        return this.renderLoader()
      case apiStatusObj.success:
        return this.renderSlider()
      case apiStatusObj.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <div>
          <Header />
          <div className="home-content-container">
            <h1 className="home-heading">Find Your Next Favorite Books?</h1>
            <p className="home-description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <div className="slick-container">
              <div className="slider-heading-container">
                <h1 className="slider-heading">Top Rated Books</h1>
                <button type="button" className="findbooks-btn">
                  Find Books
                </button>
              </div>
              <div className="slide-images-container">
                {this.renderApiStatus()}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
