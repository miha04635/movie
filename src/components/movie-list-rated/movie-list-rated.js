import React from 'react'
import { Flex, Alert } from 'antd'

import 'antd/dist/reset.css'
import MovieItem from '../movie-item/movie-item'

const MovieListRated = ({ films, statusCode }) => {
  if (statusCode === 34) {
    return <Alert message="No movies rated" type="error" style={{ marginBlock: 16 }} />
  }

  if (!films) {
    return null
  }

  const elements = films.map(item => {
    const { id, vote_average, ...itemProps } = item

    return <MovieItem key={id} {...itemProps} voteAverage={vote_average} />
  })

  return (
    <Flex wrap="wrap" style={{ width: 1070 }} justify="space-around" className="movieList">
      {elements}
    </Flex>
  )
}

export default MovieListRated
