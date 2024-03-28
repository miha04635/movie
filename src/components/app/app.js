import React, { Component } from 'react'
import { Flex, Tabs } from 'antd'
import { Offline } from 'react-detect-offline'
import { debounce } from 'lodash'

import 'antd/dist/reset.css'
import './app.css'

import Services from '../../services/services'
import MovieList from '../movie-list/movie-list'
import MovieListRated from '../movie-list-rated/movie-list-rated'
import Spinner from '../spinner/spinner'
import ErrorIndicator from '../error-indicator/error-indicator'
import SearchMovies from '../search-movies/search-movies'
import PaginationList from '../pagination/pagination'
import { ServiceProvider } from '../../services-context/services-context'

export default class App extends Component {
  services = new Services()

  guestSessionId = localStorage.getItem('guestSessionId')

  state = {
    movieData: [],
    newMovieData: [],
    loading: true,
    error: false,
    currentPage: 1,
    genres: [],
    statusCode: '',
    searchStatus: false,
    value: '',
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  getFilms = page => {
    if (!this.state.searchStatus) {
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
  }

  componentDidMount = () => {
    this.getGenresId()
    this.guestSession()
    this.getFilms()
  }

  searchMovies = () =>
    debounce(value => {
      this.services
        .searchAllMovies(value)
        .then(res => {
          this.setState({
            movieData: res.results,
            currentPage: res.total_pages,
            searchStatus: true,
            value,
          })
        })
        .catch(this.onError)
    }, 1000)

  searchMoviesPagination = page => {
    this.services
      .searchAllMovies(this.state.value, page)
      .then(res => {
        this.setState({
          movieData: res.results,
          currentPage: res.total_pages,
        })
      })
      .catch(this.onError)
  }

  guestSession = () => {
    this.services
      .createQuestSession()
      .then(res => {
        if (this.guestSessionId) {
          return null
        }
        return localStorage.setItem('guestSessionId', res.guest_session_id)
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

  getRated = key => {
    if (key === '2') {
      this.services
        .getAllRated(localStorage.getItem('guestSessionId'))
        .then(res => res.json())
        .then(res => {
          this.setState({
            statusCode: res.status_code,
            newMovieData: res.results,
            loading: false,
            currentPageRated: res.total_pages,
          })
        })
        .catch(this.onError)
    }
  }

  render() {
    const { movieData, loading, error, currentPage, newMovieData, genres, guestSessionId, statusCode, searchStatus } =
      this.state

    const hasData = !(loading || error)

    const spinner = loading ? <Spinner /> : null
    const content = hasData ? (
      <MovieList films={movieData} postRated={this.services.postRated} guestSessionId={guestSessionId} />
    ) : null

    const contentRated = hasData ? <MovieListRated films={newMovieData} statusCode={statusCode} /> : null

    const errorMessage = error ? <ErrorIndicator /> : null
    const search = hasData ? <SearchMovies search={this.searchMovies} /> : null
    const pagination = hasData ? (
      <PaginationList
        currentPage={currentPage}
        getFilms={this.getFilms}
        searchMoviesPagination={this.searchMoviesPagination}
        searchStatus={searchStatus}
      />
    ) : null

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
