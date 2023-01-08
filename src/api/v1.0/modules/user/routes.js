const express = require("express");
const { Router } = express;
const router = new Router();
import { methodNotAllowed, validateUser, validateRole, uploadMiddleware, validateSchema } from "#middlewares/index";
import { ROLES } from "#constants/index";
import { controller as api } from "./controller";
import { schema } from "./schema";

router.route("/test").all(validateUser, validateRole(ROLES.USER)).get(api.test).all(methodNotAllowed);
router.route("/contract/analyze").post(uploadMiddleware("contract_file"), validateSchema(schema.analyzeContract), api.analyzeContract).all(methodNotAllowed);

module.exports = router;
