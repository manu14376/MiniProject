import './index.css'

const Navbar = props => {
  const {bookshelvesList, ChangeInCategory, activeCategory} = props

  const item = each => {
    const {id, value, label} = each
    const isActive = activeCategory === value ? 'active' : ''

    const ChangeCategory = () => {
      ChangeInCategory(value)
    }

    return (
      <li key={id}>
        <button
          type="button"
          className={`category-btn ${isActive}`}
          onClick={ChangeCategory}
        >
          {label}
        </button>
      </li>
    )
  }
  return (
    <nav className="navbar-container">
      <h1 className="navbar-heading">Bookshelves</h1>
      <ul className="ul-list-category">
        {bookshelvesList.map(each => item(each))}
      </ul>
    </nav>
  )
}

export default Navbar
