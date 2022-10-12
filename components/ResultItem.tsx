import React from 'react';
import { ISearchResult } from '../types';

const ResultItem: React.FC<ISearchResult> = ({ pageid, title, snippet }) => {
  return (
    <div className=''>
      <div className='result' key={pageid}>
        <h3>{title}</h3>
        <div dangerouslySetInnerHTML={{ __html: snippet }}></div>
      </div>
    </div>
  );
};

export default ResultItem;
