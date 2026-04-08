import {sortDirections} from "./SortDirections";


export type PaginatedOutput={
    searchNameTerm:string;
    sortBy:string;
    sortDirection: sortDirections;
    pageNumber:number;
    pageSize:number;
}

