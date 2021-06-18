const express = require("express");
const { Router } = express;
const router = new Router();

const userRoutes = require("./modules/common/users/routes");

router.get("/", (req, res) => {
  res.jsend.success("Hello v1.0 GET API");
});

router.use(userRoutes);

module.exports = router;
