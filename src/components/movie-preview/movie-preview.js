import React from 'react'

import 'antd/dist/reset.css'
import './movie-preview.css'

const MoviePreview = ({ posterPath }) => {
  const URL = 'https://image.tmdb.org/t/p/original'
  if (!posterPath) {
    return (
      <div className="box">
        <img alt="фото" className="stub" />
      </div>
    )
  }

  return (
    <div className="box">
      <img className="image" src={URL + posterPath} alt="Preview" />
    </div>
  )
}

export default MoviePreview
