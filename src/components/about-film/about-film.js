import React from 'react'

import './about-film.css'

const AboutFilm = ({ overview }) => {
  let text = overview.slice(0, 150)
  if (text.length < overview.length) {
    text += '...'
  }

  return (
    <div className="aboutFilm">
      <p className="aboutText">{text}</p>
    </div>
  )
}

export default AboutFilm
