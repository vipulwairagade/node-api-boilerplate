import { catchAsync } from "../../../../utils";
import { userService } from "./user";

export const controller = {
	test: catchAsync(async (req, res) => {
		const response = await userService.test();
		res.jsend.success(response);
	}),

	demo: catchAsync(async (req, res) => {
		const response = await userService.demo();
		res.jsend.success(response, "This is demo route");
	})
};
