export type ApiResponseType<T> = {
  results: T;
  info: PageInfo;
};

export type PageInfo = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};
