const express = require("express");
const { Router } = express;
const router = new Router();
import { logger } from "@helpers";

const userRoutes = require("./modules/common/users/routes");

router.get("/", (req, res) => {
  logger.info("This is demo log");
  res.jsend.success("Hello v1.0 GET API");
});

router.use(userRoutes);

module.exports = router;
