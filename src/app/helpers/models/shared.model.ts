export interface ILoading {
    show: boolean;
    type?: string;
    color?: string; 
}

export interface IPagination {
    offset: number,
    limit: number
  }

  export interface IApiResponse<T> {
    results: T,
    next: string,
    previous: string | null,
    count: number
  }