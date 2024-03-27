import { Component } from 'react'
import { Card, Flex, Typography, Rate } from 'antd'

import 'antd/dist/reset.css'
import ReleaseDate from '../release-date/release-date'
import Genre from '../genre/genre'
import MoviePreview from '../movie-preview/movie-preview'
import { ServiceConsumer } from '../../services-context/services-context'
import './movie-item.css'

export default class MovieItem extends Component {
  filmsRating = (voteAverage = 0) => {
    if (voteAverage >= 0 && voteAverage <= 3) {
      return `${'#E90000'}`
    }
    if (voteAverage >= 3 && voteAverage <= 5) {
      return `${'#E97E00'}`
    }
    if (voteAverage >= 5 && voteAverage <= 7) {
      return `${'#E9D100'}`
    }
    return `${'#66E900'}`
  }

  render() {
    const { title, overview, release_date, backdrop_path, voteAverage, postRated, genre_ids } = this.props

    let text = overview.slice(0, 150)
    if (text.length < overview.length) {
      text += '...'
    }

    return (
      <Card className="card">
        <Flex justify="space-between">
          <MoviePreview posterPath={backdrop_path} />
          <Flex vertical align="flex-start" justify="space-around">
            <Typography.Title level={4}>
              <div className="title">{title}</div>
            </Typography.Title>
            <div
              className="filmRating"
              style={{
                border: ` 2px solid ${this.filmsRating(voteAverage)}`,
              }}
            >
              {voteAverage.toFixed(1)}
            </div>
            <ReleaseDate release_date={release_date} />
            <ServiceConsumer>{genres => <Genre value={genres} id={genre_ids} />}</ServiceConsumer>
            <div className="aboutFilm">
              <p className="aboutText">{text}</p>
            </div>
            <Rate allowHalf count={10} onChange={postRated}></Rate>
          </Flex>
        </Flex>
      </Card>
    )
  }
}
