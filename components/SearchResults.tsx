import { useState } from 'react';
import { ISearchResult } from '../types/index';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const SearchResults: React.FC = () => {
  const searchResults = useSelector((state: RootState) => state.search.searchResults);

  return (
    <div>
      <div>
        {searchResults?.length > 0
          ? searchResults?.map((item: ISearchResult) => (
              <div className='result' key={item.pageid}>
                <h3>{item.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: item.snippet }}></div>
              </div>
            ))
          : 'No results'}
      </div>
    </div>
  );
};

export default SearchResults;
