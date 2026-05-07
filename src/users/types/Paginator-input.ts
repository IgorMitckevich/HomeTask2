import { sortDirections } from "../../core/types/SortDirections";

export type PaginatorInput = {
  searchLoginTerm: string;
  searchEmailTerm: string;
  sortBy: string;
  sortDirection: sortDirections;
  pageNumber: number;
  pageSize: number;
};
