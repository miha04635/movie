import React from 'react'

import './genre.css'

const Genre = ({ value, id }) => {
  const genreList = id.map(itemId => {
    const results = value.find(item2 => item2.id === itemId)
    return results.name
  })

  const elements = genreList.map((item, index) => {
    return (
      <div key={`${index}${item}`} className="genre">
        {item}
      </div>
    )
  })

  return <div>{elements}</div>
}

export default Genre
