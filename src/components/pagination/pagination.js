import React from 'react'
import { Pagination } from 'antd'

import './pagination.css'

const PaginationList = ({ currentPage, getFilms }) => {
  return <Pagination className="pagination" defaultCurrent={1} total={currentPage} onChange={page => getFilms(page)} />
}

export default PaginationList
