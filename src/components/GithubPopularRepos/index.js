import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const apiStatus = {
  failure: 'failure_status',
  success: 'success_status',
  loading: 'loading_status',
}

class GithubPopularRepos extends Component {
  state = {
    selectedLanguage: languageFiltersData[0].language,
    status: apiStatus.loading,
    productsList: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {selectedLanguage} = this.state
    this.setState({status: apiStatus.loading})
    const selectedObj = languageFiltersData.find(
      each => each.language === selectedLanguage,
    )
    const {id} = selectedObj
    const url = `https://apis.ccbp.in/popular-repos?language=${id}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const list = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
      }))
      this.setState(prevState => ({
        ...prevState,
        status: apiStatus.success,
        productsList: list,
      }))
    } else if (response.status === 401) {
      this.setState(prevState => ({...prevState, status: apiStatus.failure}))
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {productsList} = this.state
    return (
      <ul className="products-list-container">
        {productsList.map(eachItem => (
          <RepositoryItem each={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
    </div>
  )

  onLanguage = id => {
    const selectedObj = languageFiltersData.find(each => each.id === id)
    this.setState({selectedLanguage: selectedObj.language}, this.getData)
  }

  renderOutput = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.loading:
        return this.renderLoadingView()
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {selectedLanguage} = this.state
    return (
      <div className="main-container">
        <h1 className="heading">Popular</h1>
        <ul className="list-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              each={each}
              key={each.id}
              onLanguage={this.onLanguage}
              isActive={each.language === selectedLanguage}
            />
          ))}
        </ul>
        {this.renderOutput()}
      </div>
    )
  }
}
export default GithubPopularRepos
