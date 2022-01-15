import express from "express";
const { Router } = express;
const router = new Router();
import usersRoutes from "./modules/users/routes";
router.get("/", (req, res) => {
	res.jsend.success("Hello v1.0 API");
});

router.use(usersRoutes);

module.exports = router;
