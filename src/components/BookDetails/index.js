import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

class BookDetails extends Component {
  state = {
    bookDetails: {},
  }

  componentDidMount() {
    this.getResults()
  }

  getResults = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        id: data.book_details.id,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }
      this.setState({bookDetails: updatedData})
    }
  }

  render() {
    const {bookDetails} = this.state
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      rating,
      readStatus,
      title,
    } = bookDetails
    return (
      <div className="book-details-container">
        <Header />
        <div className="book-details-card">
          <div className="book-info-container">
            <img src={coverPic} alt={title} className="book-details-image" />
            <div>
              <h1 className="book-details-title">{title}</h1>
              <p className="book-information">{authorName}</p>
              <p className="book-information">
                Avg rating{' '}
                <BsFillStarFill height={16} width={16} color=" #FBBF24" />{' '}
                <span className="rating">{rating}</span>
              </p>
              <p className="book-information">
                Status:{' '}
                <span className="book-details-status">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr className="hr-line" />
          <h1 className="about-heading">About Author</h1>
          <p className="about-description">{aboutAuthor}</p>
          <h1 className="about-heading">About Book</h1>
          <p className="about-description">{aboutBook}</p>
        </div>
        <Footer />
      </div>
    )
  }
}

export default BookDetails
