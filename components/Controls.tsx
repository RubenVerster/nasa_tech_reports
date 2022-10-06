import axios from 'axios';
import { useEffect, useState } from 'react';
// import debounce from 'lodash/debounce';
import { ISearchResult } from '../types/index';
import { useSelector, useDispatch } from 'react-redux';
import { setResults } from '../store/home';
import { RootState } from '../store';

const Controls = () => {
  const URL = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch=%22engineering%22&srlimit=10`;

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      console.log(response.data);
      dispatch(setResults(response.data.query.search));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <input></input>
    </div>
  );
};

export default Controls;
