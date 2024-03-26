export default class Services {
  _abiBase = 'https://api.themoviedb.org/3'

  _apiKey = 'a018f4609f3a0dfc6bc8469fe19dc494'

  async getResource(url) {
    const res = await fetch(`${this._abiBase}${url}`)
    return res.json()
  }

  getAllFilms(page = 1) {
    return this.getResource(`/trending/movie/day?api_key=${this._apiKey}&page=${page}`)
  }

  searchAllMovies(value) {
    return this.getResource(
      `/search/movie?api_key=${this._apiKey}&query=${value.target.value}&include_adult=true&language=en-US&page=${1}`
    )
  }

  createQuestSession() {
    return this.getResource(`/authentication/guest_session/new?api_key=${this._apiKey}`)
  }

  getAllGenresId() {
    return this.getResource(`/genre/movie/list?api_key=${this._apiKey}`)
  }

  getAllRated(guestSessionId) {
    return fetch(`${this._abiBase}/guest_session/${guestSessionId}/rated/movies?api_key=${this._apiKey}&language=en-US`)
  }

  postRated = (id, guestSessionId) => {
    const res = fetch(
      `${this._abiBase}/movie/${id}/rating?api_key=${this._apiKey}&guest_session_id=${guestSessionId}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: '{"value":8.5}',
      }
    )
    return res
  }
}
