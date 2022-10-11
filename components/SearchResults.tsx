import { ISearchResult } from '../types/index';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { MoonLoader } from 'react-spinners';

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
            ? replaceResults?.map((item: ISearchResult) => (
                <div className='result' key={item.pageid}>
                  <h3>{item.title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: item.snippet }}></div>
                </div>
              ))
            : !firstSearch && <h3>No results found</h3>}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
