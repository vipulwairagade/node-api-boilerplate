import { Router } from "express";
import usersRoutes from "./modules/users/routes";

const router = new Router();

router.get("/", (req, res) => {
	res.jsend.success("Hello v1.0 API");
});

router.use(usersRoutes);

export default router;
