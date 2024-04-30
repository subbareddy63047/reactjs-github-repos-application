// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {each} = props
  const {avatarUrl, name, starsCount, forksCount, issuesCount} = each
  return (
    <li className="each-card">
      <div className="card-inner-container">
        <img src={avatarUrl} alt={name} className="avatarUrl" />
        <h1 className="card-title">{name}</h1>
        <div className="stars-container">
          <div className="star-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
              alt="stars"
              className="star-img"
            />
          </div>
          <p className="stars-text">{starsCount} stars</p>
        </div>

        <div className="stars-container">
          <div className="star-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
              alt="forks"
              className="star-img"
            />
          </div>
          <p className="stars-text">{forksCount} forks</p>
        </div>

        <div className="stars-container">
          <div className="star-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
              alt="open issues"
              className="star-img"
            />
          </div>
          <p className="stars-text">{issuesCount} issues</p>
        </div>
      </div>
    </li>
  )
}
export default RepositoryItem
