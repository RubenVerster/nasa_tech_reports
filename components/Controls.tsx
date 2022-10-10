import axios from 'axios';
import React, { useState } from 'react';
// import debounce from 'lodash/debounce';
import { EReplaceType, ISearchResult } from '../types/index';
import { useSelector, useDispatch } from 'react-redux';
import { setGenesisResults, setReplaceResults } from '../store/search';
import { RootState } from '../store';
import ResponseCache from 'next/dist/server/response-cache';

const Controls = () => {
  const dispatch = useDispatch();

  const genesisResults = useSelector((state: RootState) => state.search.genesisResults);

  let searchResults = useSelector((state: RootState) => state.search.replaceResults);
  const [searchTerm, setSearchTerm] = useState<string>('quantum');
  const [replaceSearchTerm, setReplaceSearchTerm] = useState<string>('');

  const URL = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch=${searchTerm}&srlimit=10`;

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

  const replaceText = (replaceType: EReplaceType) => {
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
  };

  return (
    <div style={{ color: 'green ' }}>
      <form onSubmit={(e) => handleSearch(e)}>
        <input value={searchTerm} type='text' onChange={(e) => searchInputChange(e)}></input>
        <button type='submit'>Search</button>
      </form>
      <input type='text' value={replaceSearchTerm} onChange={(e) => handleReplaceInputChange(e)}></input>
      <button onClick={() => replaceText(EReplaceType.single)}>Replace First</button>
      <button onClick={() => replaceText(EReplaceType.all)}>Replace All</button>
    </div>
  );
};

export default Controls;
