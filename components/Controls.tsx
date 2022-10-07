import axios from 'axios';
import React, { useState } from 'react';
// import debounce from 'lodash/debounce';
import { EReplaceType, ISearchResult } from '../types/index';
import { useSelector, useDispatch } from 'react-redux';
import { setResults } from '../store/home';
import { RootState } from '../store';

const Controls = () => {
  const dispatch = useDispatch();

  const searchResults = useSelector((state: RootState) => state.search.searchResults);
  const [searchTerm, setSearchTerm] = useState<string>('quantum immortality');
  const [replaceSearchTerm, setReplaceSearchTerm] = useState<string>('');

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const URL = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch=%22${searchTerm}%22&srlimit=10`;

  const searchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleReplaceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplaceSearchTerm(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  const replace = (replaceType: EReplaceType) => {
    const newSearchResults = searchResults?.map((item: ISearchResult) => {
      const newTitle = item.title.replace(searchTerm, replaceSearchTerm);
      const newSnippet = item.snippet.replace(searchTerm, replaceSearchTerm);
      return { ...item, title: newTitle, snippet: newSnippet };
    });
    dispatch(setResults(newSearchResults));
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URL);
      console.log(response.data);
      dispatch(setResults(response.data.query.search));
    } catch (error) {
      console.log(error);
      setError('Failed to load data');
    }
    setLoading(false);
  };

  return (
    <div style={{ color: 'green ' }}>
      <form onSubmit={(e) => handleSearch(e)}>
        <input value={searchTerm} type='text' onChange={(e) => searchInputChange(e)}></input>
        <button type='submit'>Search</button>
      </form>
      <input type='text' value={replaceSearchTerm} onChange={(e) => handleReplaceInputChange(e)}></input>
      <button onClick={() => replace(EReplaceType.single)}>Replace First</button>
      <button onClick={() => replace(EReplaceType.all)}>Replace All</button>
    </div>
  );
};

export default Controls;
