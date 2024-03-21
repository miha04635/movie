import React from 'react'
import { Pagination } from 'antd'

const PaginationList = ({ currentPage, clickPagination }) => {
  return (
    <Pagination
      defaultCurrent={1}
      total={currentPage}
      onChange={page => {
        clickPagination(page)
      }}
      style={{
        width: '50%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 560,
        paddingBottom: 16,
      }}
    />
  )
}

export default PaginationList
