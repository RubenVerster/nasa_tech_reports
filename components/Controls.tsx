import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import debounce from 'lodash/debounce';
import { EReplaceType, ISearchResult } from '../types/index';
import { useSelector, useDispatch } from 'react-redux';
import { setGenesisResults, setReplaceResults } from '../store/search';
import { RootState } from '../store';
import debounce from 'lodash/debounce';
import { MoonLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const Controls = () => {
  const dispatch = useDispatch();

  const genesisResults = useSelector((state: RootState) => state.search.genesisResults);

  let searchResults = useSelector((state: RootState) => state.search.replaceResults);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [replaceSearchTerm, setReplaceSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const URL = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch=${searchTerm}&srlimit=10`;

  const handleReplaceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplaceSearchTerm(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.length <= 3) {
      toast.error('Search term must be longer than 3 letters', {
        position: 'bottom-right',
        autoClose: 4444,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }
    fetchData();
  };

  const replaceText = (replaceType: EReplaceType) => {
    if (genesisResults.length === 0) return;
    searchResults = genesisResults;
    switch (replaceType) {
      //you can rather have one utility unction that replaces the text and then in the reaplce all, call that replace function on every element and in the single replace, only do it on the first element
      //use .replace on the first elelemt and replaceAll on all of them
      //can have case sensitive and case insensitive replacements
      case EReplaceType.single:
        let firstResult = searchResults[0];
        let searchResultsCopy = searchResults.slice(1);

        firstResult = {
          ...firstResult,
          snippet: firstResult.snippet
            .toLowerCase()
            .replaceAll(/(<([^>]+)>)/gi, '')
            .replace(searchTerm, `<span class=\"searchmatch\">${replaceSearchTerm}</span>`),
        };
        dispatch(setReplaceResults([firstResult, ...searchResultsCopy]));
        break;
      case EReplaceType.all:
        const newResults = searchResults.map((result) => {
          return {
            ...result,
            snippet: result.snippet
              .toLowerCase()
              .replaceAll(/(<([^>]+)>)/gi, '')
              .replaceAll(searchTerm, `<span class=\"searchmatch\">${replaceSearchTerm}</span>`),
          };
        });
        dispatch(setReplaceResults(newResults));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (searchTerm.length <= 3) {
      return;
    }
    debouncedSearch();
  }, [searchTerm]);

  const debouncedSearch = debounce(async () => {
    await fetchData();
  }, 777);

  const debouncedSetSerchTerm = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, 777);

  // const matchLowerOrUpper = (text: string) => {
  //   const firstLetter = text.charAt(0);
  //   const isUpperCase = firstLetter === firstLetter.toUpperCase();
  //   if (isUpperCase) {
  //     return text.replace(searchTerm, replaceSearchTerm.charAt(0).toUpperCase() + replaceSearchTerm.slice(1));
  //   } else {
  //     return text.replace(searchTerm, replaceSearchTerm);
  //   }
  // };

  const fetchData = async () => {
    //Easter Egg 😝
    if (searchTerm.toLowerCase() === 'hello there') alert('General Kenobi!');
    setLoading(true);

    try {
      const response = await axios.get(URL);
      console.log('%c [response]', 'color: pink', response.data.query.search);

      let exactMatch = response.data.query.search.map((result: ISearchResult) => {
        return {
          ...result,
          snippet: `${result.snippet
            // implement logic to conditionally replace a lowercase or uppercase search term
            .toLowerCase()
            .replaceAll(/(<([^>]+)>)/gi, '')
            .replaceAll(searchTerm, `<span class=\"searchmatch\">${searchTerm}</span>`)}`,
        };
      });

      dispatch(setGenesisResults(exactMatch));
      dispatch(setReplaceResults(exactMatch));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div style={{ color: 'green ' }}>
      <form onSubmit={(e) => handleSearch(e)}>
        <input type='text' onChange={(e) => debouncedSetSerchTerm(e)}></input>
        <button type='submit' disabled={loading}>
          Search
        </button>
      </form>
      <input type='text' value={replaceSearchTerm} onChange={(e) => handleReplaceInputChange(e)}></input>
      <button onClick={() => replaceText(EReplaceType.single)}>Replace First</button>
      <button onClick={() => replaceText(EReplaceType.all)}>Replace All</button>
      {loading && <MoonLoader color={'#fff'} loading={loading} size={42} />}
    </div>
  );
};

export default Controls;
