import express from "express";
const { Router } = express;
const router = new Router();
import { routeNotFound } from "#middlewares/index";
import versionRoutes from "./v1.0";

router.use("/v1.0", versionRoutes);
router.all("*", routeNotFound);

module.exports = router;
