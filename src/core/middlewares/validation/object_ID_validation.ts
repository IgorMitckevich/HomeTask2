import { param } from "express-validator";

export const mongoId = param("_id")
  .exists()
  .withMessage("objectId required")
  .isString()
  .withMessage("object_id must be a string")
  .isMongoId()
  .withMessage("objectId must be type ObjectId");
