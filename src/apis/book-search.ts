import axios from 'axios';

const TTBKey = import.meta.env.VITE_TTB_KEY;

const baseParams = {
  ttbkey: TTBKey,
  Cover: 'Big',
  MaxResults: 10,
  start: 1,
  SearchTarget: 'Book',
  output: 'JS',
  Version: '20131101',
};

export const searchBooks = async (query: string) => {
  const url = `/api/ttb/api/ItemSearch.aspx`;
  const params = {
    ...baseParams,
    Query: query,
    QueryType: 'Title',
  };

  const { data } = await axios.get(url, { params });
  return data.item || [];
};

export const getRelatedBooks = async (categoryId: number, page: number) => {
  const url = `/api/ttb/api/ItemList.aspx`;
  const params = {
    ...baseParams,
    Cover: 'MidBig',
    QueryType: 'ItemEditorChoice',
    MaxResults: 9,
    start: page,
    CategoryId: categoryId,
  };

  const { data } = await axios.get(url, { params });
  return data.item || [];
};

export const getBestsellerBooks = async () => {
  const url = `/api/ttb/api/ItemList.aspx`;
  const params = {
    ...baseParams,
    Cover: 'MidBig',
    QueryType: 'Bestseller',
    MaxResults: 10,
    start: 1,
  };

  const { data } = await axios.get(url, { params });
  return data.item || [];
};

// Big : 큰 크기 : 너비 200px
// MidBig : 중간 큰 크기 : 너비 150px
// Mid(기본값) : 중간 크기 : 너비 85px
// Small : 작은 크기 : 너비 75px
// Mini : 매우 작은 크기 : 너비 65px
// None : 없음

