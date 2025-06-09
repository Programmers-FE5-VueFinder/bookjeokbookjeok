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
