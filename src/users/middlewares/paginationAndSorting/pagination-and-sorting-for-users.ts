import {query} from 'express-validator'
import { sortDirections} from '../../../core/types/SortDirections'



export const DEFAULT_VALUES_FOR_USERS={
    searchLoginTerm:null,
    searchEmailTerm:null,
    sortBy:'createdAt',
    sortDirection: sortDirections.desc,
    pageNumber:1,
    pageSize:10
}



export function paginationAndSortingValidation<T extends string>(sortFieldsEnum:Record<string, T>){
    const allowedSortFields = Object.values(sortFieldsEnum).filter(
        (value): value is T => typeof value === 'string'
    );
    return [
        query('searchLoginTerm')
            .default(DEFAULT_VALUES_FOR_USERS.searchLoginTerm)
            .isString()
            .withMessage('searchLoginTerm must be a string')
        ,query('searchEmailTerm')
            .default(DEFAULT_VALUES_FOR_USERS.searchEmailTerm)
            .isString()
            .withMessage('searchEmailTerm must be a string')
        ,query('sortBy')
            .default(DEFAULT_VALUES_FOR_USERS.sortBy)
            .isIn(Object.values(sortFieldsEnum))
            .withMessage(`Invalid sort field. Allowed values: ${allowedSortFields.join(',')}`)
        ,
        query('sortDirection')
            .default(DEFAULT_VALUES_FOR_USERS.sortDirection)
            .isIn(Object.values(sortDirections))
            .withMessage(`Sort direction must be one of: ${Object.values(sortDirections).join(', ')}`)
        ,
        query('pageNumber')
            .default(DEFAULT_VALUES_FOR_USERS.pageNumber)
            .isInt({min:1})
            .withMessage('Page number must be a positive integer')
            .toInt()
        ,
        query('pageSize')
            .default(DEFAULT_VALUES_FOR_USERS.pageSize)
            .isInt({min:1})
            .withMessage('pageSize must be a positive integer')
            .toInt()
    ]

}