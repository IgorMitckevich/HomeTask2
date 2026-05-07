import { query } from "express-validator";
import { sortDirections } from "../../types/SortDirections";

export const DEFAULT_VALUEST = {
  searchNameTerm: null,
  sortBy: "createdAt",
  sortDirection: sortDirections.desc,
  pageNumber: 1,
  pageSize: 10,
};

export function paginationAndSortingValidation<T extends string>(
  sortFieldsEnum: Record<string, T>,
) {
  const allowedSortFields = Object.values(sortFieldsEnum).filter(
    (value): value is T => typeof value === "string",
  );
  return [
    query("searchNameTerm")
      .default(DEFAULT_VALUEST.searchNameTerm)
      .isString()
      .withMessage("searchNameTerm must be a string"),
    query("sortBy")
      .default(DEFAULT_VALUEST.sortBy)
      .isIn(Object.values(sortFieldsEnum))
      .withMessage(
        `Invalid sort field. Allowed values: ${allowedSortFields.join(",")}`,
      ),
    query("sortDirection")
      .default(DEFAULT_VALUEST.sortDirection)
      .isIn(Object.values(sortDirections))
      .withMessage(
        `Sort direction must be one of: ${Object.values(sortDirections).join(", ")}`,
      ),
    query("pageNumber")
      .default(DEFAULT_VALUEST.pageNumber)
      .isInt({ min: 1 })
      .withMessage("Page number must be a positive integer")
      .toInt(),
    query("pageSize")
      .default(DEFAULT_VALUEST.pageSize)
      .isInt({ min: 1 })
      .withMessage("pageSize must be a positive integer")
      .toInt(),
  ];
}
