import React, { Component } from 'react'
import { Flex, Tabs } from 'antd'
import { Offline } from 'react-detect-offline'
import { debounce } from 'lodash'

import 'antd/dist/reset.css'
import './app.css'

import Services from '../../services/services'
import MovieList from '../movie-list/movie-list'
import Spinner from '../spinner/spinner'
import ErrorIndicator from '../error-indicator/error-indicator'
import SearchMovies from '../search-movies/search-movies'
import PaginationList from '../pagination/pagination'
import { ServiceProvider } from '../../services-context/services-context'

export default class App extends Component {
  services = new Services()

  state = {
    movieData: [],
    newMovieData: [],
    loading: true,
    loadingRated: true,
    error: false,
    value: '',
    currentPage: 1,
    genres: [],
    guestSessionId: '',
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  getFilms = page => {
    this.services
      .getAllFilms(page)
      .then(res => {
        this.setState({
          movieData: res.results,
          loading: false,
          currentPage: res.total_pages,
        })
      })
      .catch(this.onError)
  }

  componentDidMount = () => {
    this.getGenresId()
    this.guestSession()
    this.getFilms()
  }

  searchMovies = debounce(value => {
    this.services
      .searchAllMovies(value)
      .then(res => {
        this.setState({
          movieData: res.results,
          currentPage: res.total_pages,
        })
      })
      .catch(this.onError)
  }, 1000)

  guestSession = () => {
    this.services
      .createQuestSession()
      .then(res => {
        this.setState({
          guestSessionId: res.guest_session_id,
        })
      })
      .catch(this.onError)
  }

  getGenresId = () => {
    this.services
      .getAllGenresId()
      .then(res => {
        this.setState({
          genres: res.genres,
        })
      })
      .catch(this.onError)
  }

  getRated = () => {
    this.services
      .getAllRated(this.state.guestSessionId)
      .then(res => res.json())
      .then(res => {
        this.setState({
          newMovieData: res.results,
          loading: false,
          currentPageRated: res.total_pages,
        })
      })
      .catch(this.onError)
  }

  render() {
    const { movieData, loading, error, currentPage, newMovieData, genres, guestSessionId } = this.state

    const hasData = !(loading || error)

    const spinner = loading ? <Spinner /> : null
    const content = hasData ? (
      <MovieList films={movieData} postRated={this.services.postRated} guestSessionId={guestSessionId} />
    ) : null

    const contentRated = hasData ? <MovieList films={newMovieData} /> : null

    const errorMessage = error ? <ErrorIndicator /> : null
    const search = hasData ? <SearchMovies search={this.searchMovies} /> : null
    const pagination = hasData ? <PaginationList currentPage={currentPage} getFilms={this.getFilms} /> : null

    const items = [
      {
        key: '1',
        label: 'Search',
        children: [spinner, search, content, pagination],
      },
      {
        key: '2',
        label: 'Rated',
        children: [spinner, contentRated],
      },
    ]

    return (
      <>
        <ServiceProvider value={genres}>
          <Flex justify="space-around">
            <Tabs defaultActiveKey="1" items={items} centered onChange={this.getRated} />
          </Flex>
          {errorMessage}
        </ServiceProvider>
        <Offline>
          <ErrorIndicator />
        </Offline>
      </>
    )
  }
}
