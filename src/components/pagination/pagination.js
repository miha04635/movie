import React from 'react'
import { Pagination } from 'antd'

import './pagination.css'

const PaginationList = ({ currentPage = 500, getFilms, searchMoviesPagination, searchStatus }) => {
  return (
    <Pagination
      className="pagination"
      pageSize={true}
      showSizeChanger={false}
      defaultCurrent={1}
      total={currentPage}
      onChange={page => {
        if (!searchStatus) {
          getFilms(page)
        }
        if (searchStatus) {
          searchMoviesPagination(page)
        }
      }}
    />
  )
}

export default PaginationList
