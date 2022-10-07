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
