import React from 'react'

import 'antd/dist/reset.css'
import './movie-preview.css'

const MoviePreview = ({ posterPath }) => {
  const URL = 'https://image.tmdb.org/t/p/original'
  return (
    <div className="box" style={{ marginRight: 16 }}>
      <img className="image" src={URL + posterPath} alt="Preview" />
    </div>
  )
}

export default MoviePreview
