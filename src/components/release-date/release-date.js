import React from 'react'
import { format } from 'date-fns'

const ReleaseDate = ({ release_date }) => {
  if (!release_date) {
    return null
  }
  const dateFormat = format(new Date(release_date), 'MMMM dd, yyyy')

  return <div className="date">{dateFormat}</div>
}

export default ReleaseDate
