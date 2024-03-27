import React from 'react'

import 'antd/dist/reset.css'
import './movie-preview.css'

const MoviePreview = ({ posterPath }) => {
  const URL = 'https://image.tmdb.org/t/p/original'
  if (!posterPath) {
    return (
      <div className="boxStub">
        <img alt="фото" className="stub" src="https://placehold.co/160x280?text=no\nimage" />
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
