import { ISearchResult } from '../types/index';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const SearchResults: React.FC = () => {
  const replaceResults = useSelector((state: RootState) => state.search.replaceResults);

  return (
    <div>
      <div>
        {replaceResults?.length > 0
          ? replaceResults?.map((item: ISearchResult) => (
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
