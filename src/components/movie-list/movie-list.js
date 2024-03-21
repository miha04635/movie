import React from 'react'
import { Flex, Alert } from 'antd'

import 'antd/dist/reset.css'
import MovieItem from '../movie-item/movie-item'
import './movie-list.css'

const MovieList = ({ films, click }) => {
  if (!films) {
    return null
  }
  const elements = films.map(item => {
    const { id, vote_average, ...itemProps } = item

    return <MovieItem key={id} {...itemProps} click={() => click(id)} voteAverage={vote_average} />
  })

  if (elements.length === 0) {
    return <Alert message="Пусто! По новой" type="success" style={{ marginBlock: 16 }} />
  }

  return (
    <Flex wrap="wrap" style={{ width: 1070 }} justify="space-around" className="movieList">
      {elements}
    </Flex>
  )
}

export default MovieList
