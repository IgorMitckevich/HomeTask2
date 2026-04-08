import {BlogViewModel} from "./blogersModel";
import {PaginatedOutput} from "../../core/types/Paginated-output";


export type BlogsPaginated={
    pagesCount:number;
    page:number;
    pageSize:number;
    items:BlogViewModel[];
    totalCount:number;
}

