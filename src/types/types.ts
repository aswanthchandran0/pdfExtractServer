export interface Error extends globalThis.Error {
    status?: number;
  }