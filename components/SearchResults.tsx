import { ISearchResult } from '../types/index';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { MoonLoader } from 'react-spinners';
import Image from 'next/image';
import ResultItem from './ResultItem';

const SearchResults: React.FC = () => {
  const replaceResults = useSelector((state: RootState) => state.search.replaceResults);
  const loading = useSelector((state: RootState) => state.search.loading);
  const firstSearch = useSelector((state: RootState) => state.search.firstSearch);

  return (
    <div>
      {loading ? (
        <MoonLoader color={'#fff'} loading={loading} size={42} />
      ) : (
        <div>
          {replaceResults?.length > 0
            ? replaceResults?.map((item: ISearchResult) => <ResultItem key={item.pageid} {...item} />)
            : !firstSearch && (
                <div className='no-results'>
                  <h3>No results were found :(</h3>
                  <Image src='/resources/img/no_results.gif' alt='no results' width={300} height={300} />
                </div>
              )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
