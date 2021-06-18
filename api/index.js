const express = require("express");
const { Router } = express;
const router = new Router();
import { routeNotFound } from "../middlewares";

router.use("/v1.0", require("./v1.0"));
router.all("*", routeNotFound);

module.exports = router;
