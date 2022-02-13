const express = require("express");
const { Router } = express;
const router = new Router();
import { methodNotAllowed, validateUser, validateRole } from "#middlewares/index";
import { ROLES } from "#constants/index";
import { controller as api } from "./controller";

router.route("/test").all(validateUser, validateRole(ROLES.USER)).get(api.test).all(methodNotAllowed);
router.route("/demo").get(api.demo).all(methodNotAllowed);

module.exports = router;
