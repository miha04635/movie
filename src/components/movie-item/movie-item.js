import { Component } from 'react'
import { Card, Flex, Typography, Rate } from 'antd'

import 'antd/dist/reset.css'
import AboutFilm from '../about-film/about-film'
import ReleaseDate from '../release-date/release-date'
import Genre from '../genre/genre'
import MovieTitle from '../movie-title/movie-title'
import MoviePreview from '../movie-preview/movie-preview'
import { ServiceConsumer } from '../services/services-context'
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
    const { title, overview, release_date, backdrop_path, voteAverage, click, genre_ids } = this.props

    return (
      <Card className="card">
        <Flex justify="space-between">
          <MoviePreview posterPath={backdrop_path} />
          <Flex vertical align="flex-start" justify="space-around">
            <Typography.Title level={4}>
              <MovieTitle title={title} />
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
            <AboutFilm overview={overview} />
            <Rate allowHalf count={10} onChange={click}></Rate>
          </Flex>
        </Flex>
      </Card>
    )
  }
}
