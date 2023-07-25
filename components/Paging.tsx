'use client';

import React from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Pagination from 'react-paginate';

import PropTypes from 'prop-types';

function Paging({ pageCount, onPageChange }: any) {
  const [currentPage, setCurrentPage] = useState(1); // 当前页数
  const postsPerPage = 10; // 每页显示的卡片数量

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      onPageChange={onPageChange}
      containerClassName="pagination"
      activeClassName="active"
    />
  );
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Paging;
