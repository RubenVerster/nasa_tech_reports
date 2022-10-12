export interface ISearchResult {
  ns: number;
  pageid: number;
  size: number;
  snippet: string;
  timestamp: string;
  title: string;
  wordcount: number;
}

export type totalhits = number;

export enum EReplaceType {
  single = 'single',
  all = 'all',
}

export interface SearchState {
  genesisResults: ISearchResult[];
  replaceResults: ISearchResult[];
  loading: boolean;
  firstSearch: boolean;
  searchTerm: string;
}
