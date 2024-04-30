// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {each, isActive, onLanguage} = props
  const {language, id} = each
  const activeClass = isActive ? 'active' : ''

  const selectLanguage = () => {
    onLanguage(id)
  }

  return (
    <li className="each-language-item">
      <button
        type="button"
        className={`language-btn ${activeClass}`}
        onClick={selectLanguage}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
