import { catchAsync } from "#utils/index";
import { userService } from "./user";

export const controller = {
	test: catchAsync(async (req, res) => {
		const response = await userService.test();
		res.jsend.success(response);
	}),

	analyzeContract: catchAsync(async (req, res) => {
		const response = await userService.analyzeContract(req.body, req.file);
		res.jsend.success(response.data, response.message);
	})
};
