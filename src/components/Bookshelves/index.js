import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Navbar from '../Navbar'
import Footer from '../Footer'
import BookItem from '../BookItem'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusObj = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Bookshelves extends Component {
  state = {
    activeCategory: bookshelvesList[0].value,
    searchText: '',
    booksData: [],
    apiStatus: apiStatusObj.initail,
  }

  componentDidMount() {
    this.getResults()
  }

  getResults = async () => {
    this.setState({apiStatus: apiStatusObj.inProgress})
    const {activeCategory, searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeCategory}&search=${searchText}`
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
        rating: each.rating,
        readStatus: each.read_status,
        title: each.title,
      }))
      this.setState({booksData: updatedData, apiStatus: apiStatusObj.success})
    } else {
      this.setState({apiStatus: apiStatusObj.failure})
    }
  }

  ChangeInCategory = value => {
    this.setState({activeCategory: value}, this.getResults)
  }

  ChangeInSearch = event => {
    this.setState({searchText: event.target.value})
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderNoResults = () => {
    const {searchText} = this.state
    return (
      <div className="noresults-container">
        <img
          src="https://res-console.cloudinary.com/dcpfzslnz/media_explorer_thumbnails/2fda4109b51ba4b10d640274bbb712e6/detailed"
          alt=" no books"
          className="nobooks-img"
        />
        <p className="noresults-description">
          {`Your search for ${searchText} did find any matches`}
        </p>
      </div>
    )
  }

  renderContent = () => {
    const {activeCategory, searchText, booksData} = this.state
    const activeLabel = bookshelvesList.filter(
      each => each.value === activeCategory,
    )
    return (
      <>
        <div className="navbar-content-container">
          <Navbar
            bookshelvesList={bookshelvesList}
            ChangeInCategory={this.ChangeInCategory}
            activeCategory={activeCategory}
          />
          <div className="heading-books-container">
            <div className="heading-container">
              <h1 className="heading">{`${activeLabel[0].label} books`}</h1>
              <div className="search-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="searchEl"
                  onChange={this.ChangeInSearch}
                  value={searchText}
                />
                <button
                  type="button"
                  className="search-btn"
                  onClick={this.getResults}
                >
                  <BsSearch color=" #94A3B8" size={14} />
                </button>
              </div>
            </div>
            {booksData.length === 0 ? (
              this.renderNoResults()
            ) : (
              <div className="books-container">
                <ul className="unordered-books-list">
                  {booksData.map(each => (
                    <BookItem key={each.id} details={each} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://res-console.cloudinary.com/dcpfzslnz/media_explorer_thumbnails/3a1f0a623f11490486aab4ad37fdcd6c/detailed"
        alt="failure"
        className="failure-img"
      />
      <h1 className="failure-heading">
        Something went wrong, please try again.
      </h1>
      <button type="button" className="tryagain-btn" onClick={this.getResults}>
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
        return this.renderContent()
      case apiStatusObj.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bookshelves-container">
        <Header />
        {this.renderApiStatus()}
      </div>
    )
  }
}

export default Bookshelves
