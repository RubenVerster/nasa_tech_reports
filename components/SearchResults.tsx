import { useState } from 'react';
import { ISearchResultList, ISearchResult } from '../types/index';

const SearchResults: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
      {/* <div>
            <button aria-label='Increment value' onClick={() => dispatch(increment())}>
              Increment
            </button>
            <span>{count}</span>
            <button aria-label='Decrement value' onClick={() => dispatch(decrement())}>
              Decrement
            </button>
          </div> */}
      <div>
        {searchResults.map((item: ISearchResult) => (
          <div className='result' key={item.pageid}>
            <h3>{item.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: item.snippet }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
