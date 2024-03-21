import React from 'react'
import { Pagination } from 'antd'

import './pagination.css'

const PaginationList = ({ currentPage, clickPagination }) => {
  return (
    <Pagination
      className="pagination"
      defaultCurrent={1}
      total={currentPage}
      onChange={page => {
        clickPagination(page)
      }}
    />
  )
}

export default PaginationList
