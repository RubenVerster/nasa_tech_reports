import React from 'react';
import { ISearchResult } from '../types';

const ResultItem: React.FC<ISearchResult> = ({ pageid, title, snippet }) => {
  return (
    <div className='result_item  border-white border-2 border-b-blue-700 rounded-lg p-4 text-white xl:w-1/5 lg:w-2/5 md:w-1/2 m-4'>
      <div className='result' key={pageid}>
        <h2 className='text-3xl text-blue-700 mb-2'>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: snippet }}></div>
      </div>
    </div>
  );
};

export default ResultItem;
