import axios from 'axios';

const TTBKey = import.meta.env.VITE_TTB_KEY;

const baseParams = {
  ttbkey: TTBKey,
  SearchTarget: 'Book',
  output: 'JS',
  Version: '20131101',
};

export const searchBooks = async (query: string) => {
  const url = `/api/ttb/api/ItemSearch.aspx`;
  const params = {
    ...baseParams,
    Query: query,
    MaxResults: 10,
    Cover: 'Big',
    start: 1,
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
