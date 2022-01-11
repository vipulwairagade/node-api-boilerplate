import { UserApiError } from "./error";
import { mysqlConnection, logger } from "../../../../../helpers";

export const controller = {
  test: (req, res, next) => {
    try {
      throw new UserApiError("This is demo error", 400);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  demo: async (req, res, next) => {
    try {
      const response = await mysqlConnection("SELECT * FROM test");
      res.jsend.success(response, "This is demo route");
    } catch (error) {
      next(error);
    }
  }
};
