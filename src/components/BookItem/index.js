import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookItem = props => {
  const {details} = props
  const {id, title, authorName, coverPic, rating, readStatus} = details
  return (
    <Link to={`/books/${id}`} className="route-link">
      <li className="book-list-item">
        <img src={coverPic} alt={title} className="book-img" />
        <div className="book-info">
          <h1 className="book-title">{title}</h1>
          <p className="book-author">{authorName}</p>
          <p className="book-rating">
            Avg rating{' '}
            <BsFillStarFill height={16} width={16} color=" #FBBF24" /> {rating}
          </p>
          <p className="book-status">
            Status: <span className="status">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BookItem
