export type Identifier = string;

export type Nullable<T> = T | null;

export type Pagination = {
  page: number;
  pageSize: number;
};

export type Paginated<T> = Pagination & {
  items: T[];
  total: number;
  totalPages: number;
};

export type Prettify<T> = {
  [Key in keyof T]: T[Key];
};

export type { ActionFailure, ActionResult, ActionSuccess } from "./action";
