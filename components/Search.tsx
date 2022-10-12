import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import debounce from 'lodash/debounce';
import { ISearchResult } from '../types/index';
import { useSelector, useDispatch } from 'react-redux';
import {
  setGenesisResults,
  setReplaceResults,
  setLoading,
  setFirstSearch,
  setSearchTerm,
} from '../store/search';
import { RootState } from '../store';
import debounce from 'lodash/debounce';
import { VscSearch } from 'react-icons/vsc';
import { toast } from 'react-toastify';

const Search = () => {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const loading = useSelector((state: RootState) => state.search.loading);

  const URL = `https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch=${searchTerm}&srlimit=10`;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.length < 1) {
      toast.error('At least search for the first letter of the alphabet... 🙄');
      return;
    }
    fetchData();
  };

  useEffect(() => {
    if (searchTerm.length < 1) {
      return;
    }
    debouncedSearch();
  }, [searchTerm]);

  const debouncedSearch = debounce(async () => {
    await fetchData();
  }, 333);

  const debouncedSetSerchTerm = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 1) {
      dispatch(setGenesisResults([]));
      dispatch(setReplaceResults([]));
      dispatch(setFirstSearch(true));
    }
    dispatch(setSearchTerm(e.target.value));
  }, 333);

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
    console.log(`%c [I DID A SEARCH]`, `color: blue`);
    //Easter Egg 😝
    if (searchTerm.toLowerCase() === 'hello there') alert('General Kenobi!');
    dispatch(setLoading(true));
    dispatch(setFirstSearch(false));
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
    dispatch(setLoading(false));
  };

  return (
    <div className='flex h-14 w-full'>
      <input
        className=' w-2/5 max-w-md border-blue-200 border-2 rounded-md p-2 border-r-0 rounded-r-none'
        placeholder='Enter a search term'
        type='text'
        onChange={(e) => {
          debouncedSetSerchTerm(e);
        }}
      ></input>
      <button
        onClick={(e) => handleSearch(e)}
        type='submit'
        disabled={loading}
        className='text-white p-2 border-l-0 rounded-l-none flex justify-center border-2 rounded-md border-white items-center hover:bg-white hover:text-black ease-in-out duration-200'
      >
        <VscSearch size={33} className='mr-2' /> Search
      </button>
    </div>
  );
};

export default Search;
