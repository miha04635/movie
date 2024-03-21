import React, { Component } from 'react'
import { Flex, Tabs } from 'antd'
import { Offline, Online } from 'react-detect-offline'
import { debounce } from 'lodash'

import 'antd/dist/reset.css'
import './app.css'

import MovieList from '../movie-list/movie-list'
import Spinner from '../spinner/spinner'
import ErrorIndicator from '../error-indicator/error-indicator'
import SearchMovies from '../search-movies/search-movies'
import PaginationList from '../pagination/pagination'
import { ServiceProvider } from '../services/services-context'

export default class App extends Component {
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

  click = e => {
    this.setState({ value: e.target.value })
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  func = url => {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({
          movieData: response.results,
          loading: false,
          currentPage: response.total_pages,
        })
      })
      .catch(this.onError)
  }

  componentDidMount = (page = 1) => {
    this.getGenresId()
    this.guestSession()

    this.func(`https://api.themoviedb.org/3/trending/movie/day?api_key=a018f4609f3a0dfc6bc8469fe19dc494&page=${page}`)
  }

  componentWillUnmount = () => {
    this.guestSession()
    this.getGenresId()
    this.func()
  }

  searchMoviesFunc = debounce(value => {
    this.func(
      `https://api.themoviedb.org/3/search/movie?api_key=a018f4609f3a0dfc6bc8469fe19dc494&query=${value.target.value}&include_adult=true&language=en-US&page=1`
    )
  }, 1000)

  guestSession = () => {
    fetch('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=a018f4609f3a0dfc6bc8469fe19dc494')
      .then(response => response.json())
      .then(response => {
        this.setState({
          guestSessionId: response.guest_session_id,
        })
      })

      .catch(this.onError)
  }

  getGenresId = () => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=a018f4609f3a0dfc6bc8469fe19dc494')
      .then(response => response.json())
      .then(response => {
        this.setState({
          genres: response.genres,
        })
      })
      .catch(this.onError)
  }

  postRated = id => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?api_key=a018f4609f3a0dfc6bc8469fe19dc494&guest_session_id=${this.state.guestSessionId}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: '{"value":8.5}',
      }
    )
      .then(response => response.json())

      .catch(this.onError)
  }

  getRated = () => {
    fetch(
      `https://api.themoviedb.org/3/guest_session/${this.state.guestSessionId}/rated/movies?api_key=a018f4609f3a0dfc6bc8469fe19dc494&language=en`
    )
      .then(response => response.json())
      .then(response => {
        this.setState({
          newMovieData: response.results,
          loading: false,
          currentPageRated: response.total_pages,
        })
      })
      .catch(this.onError)
  }

  render() {
    const { movieData, loading, error, currentPage, newMovieData, genres } = this.state

    const hasData = !(loading || error)

    const spinner = loading ? <Spinner /> : null
    const content = hasData ? <MovieList films={movieData} click={this.postRated} /> : null

    const contentRated = hasData ? <MovieList films={newMovieData} /> : null

    const errorMessage = error ? <ErrorIndicator /> : null
    const search = hasData ? <SearchMovies search={this.searchMoviesFunc} /> : null
    const pagination = hasData ? (
      <PaginationList currentPage={currentPage} clickPagination={this.componentDidMount} />
    ) : null

    const items = [
      {
        key: '1',
        label: 'Search',
        children: [spinner, search, content],
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
          <Online>
            <Flex justify="space-around">
              <Tabs defaultActiveKey="1" items={items} centered onChange={this.getRated} />
            </Flex>
            {errorMessage}
            {pagination}
          </Online>
        </ServiceProvider>
        <Offline>
          <ErrorIndicator />
        </Offline>
      </>
    )
  }
}
