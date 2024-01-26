import './index.css'

const SlickItem = props => {
  const {details} = props
  const {title, coverPic, authorName} = details
  return (
    <li className="list-item">
      <img src={coverPic} alt={title} className="slide-image" />
      <h1 className="title">{title}</h1>
      <p className="author">{authorName}</p>
    </li>
  )
}

export default SlickItem
