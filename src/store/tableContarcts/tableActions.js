import { PAGE_CHANGED } from './tableTypes';

export const changePage = (page) => {
  localStorage.setItem('contracts_table_page', page);
  return {
    type: PAGE_CHANGED,
    payload: page
  };
};

export const changePageSize = (pageSize) => {
  localStorage.setItem('contracts_table_page_size', pageSize)
  return {
    type: PAGE_SIZE_CHANGED,
    payload: pageSize
  };
};