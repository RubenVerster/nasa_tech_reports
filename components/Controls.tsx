import { Drawer } from '@mui/material';
import React, { useState } from 'react';
import { VscDiscard, VscReplace, VscReplaceAll, VscTools } from 'react-icons/vsc';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { setReplaceResults } from '../store/search';

import { EReplaceType } from '../types/index';
import { toast } from 'react-toastify';

const Controls = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [replaceSearchTerm, setReplaceSearchTerm] = useState<string>('');
  const handleReplaceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplaceSearchTerm(e.target.value);
  };

  const dispatch = useDispatch();

  const genesisResults = useSelector((state: RootState) => state.search.genesisResults);
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  let searchResults = useSelector((state: RootState) => state.search.replaceResults);

  //reafctor into utility file
  const replaceText = (replaceType: EReplaceType) => {
    if (genesisResults.length === 0) return;
    if (searchTerm.length < 1) {
      toast.error('At least search for the first letter of the alphabet... 🙄');
      return;
    }
    if (replaceSearchTerm.length < 1) {
      toast.error(
        'At least try to replace the first letter of the alphabet with the last letter of the alphabet... 🙄'
      );
      return;
    }
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

  const resetReplace = () => {
    if (searchResults.length === 0) return;
    if (searchResults === genesisResults) return;

    dispatch(setReplaceResults(genesisResults));
  };

  return (
    <div>
      <Drawer anchor={'right'} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {
          <>
            <div className='flex flex-col justify-between h-full p-2'>
              <div className='flex flex-col justify-between'>
                <input
                  className=' border-blue-200 border-2 rounded-md p-2 mb-3 h-14'
                  placeholder='Enter a replacement term'
                  type='text'
                  value={replaceSearchTerm}
                  onChange={(e) => handleReplaceInputChange(e)}
                ></input>
                <button
                  className='text-black p-1 py-2 flex justify-center items-center mt-1 mb-2 border-2 rounded-md border-black hover:bg-blue-400 hover:text-white ease-in-out duration-200'
                  onClick={() => replaceText(EReplaceType.single)}
                >
                  <VscReplace size={22} />
                  Replace First
                </button>
                <button
                  className='text-black p-1 py-2 flex justify-center items-center mt-1 mb-2 border-2 rounded-md border-black hover:bg-blue-400 hover:text-white ease-in-out duration-200'
                  onClick={() => replaceText(EReplaceType.all)}
                >
                  <VscReplaceAll size={22} />
                  Replace All
                </button>
                <button
                  className='text-black p-1 py-2 flex justify-center items-center mt-1 mb-2 border-2 rounded-md border-black hover:bg-blue-400 hover:text-white ease-in-out duration-200'
                  onClick={() => resetReplace()}
                >
                  <VscDiscard size={22} />
                  Reset
                </button>
              </div>
            </div>
            <button
              className='bg-blue-400 p-2 text-white border-t-2 border-blue-900'
              onClick={() => setDrawerOpen(false)}
            >
              CLOSE
            </button>
          </>
        }
      </Drawer>
      <button
        className='text-white p-3 flex justify-center border-2 rounded-md border-white items-center hover:bg-white hover:text-black ease-in-out duration-200'
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        <VscTools size={33} className='mr-2' /> Tools
      </button>
    </div>
  );
};

export default Controls;
