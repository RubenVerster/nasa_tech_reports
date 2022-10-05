import axios from 'axios';
import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { ISearchResult } from '../types/index';

const Controls = () => {
  const URL = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch=%22engineering%22&srlimit=10`;

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      console.log(response.data);
      setSearchResults(response.data.query.search);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <button aria-label='Increment value' onClick={() => dispatch(increment())}>
        Increment
      </button>
      <span>69</span>
      <button aria-label='Decrement value' onClick={() => dispatch(decrement())}>
        Decrement
      </button>
    </div>
  );
};

export default Controls;
