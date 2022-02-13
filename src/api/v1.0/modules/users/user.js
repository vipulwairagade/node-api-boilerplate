import { mysqlConnection } from "#helpers/index";
class UserService {
	async test() {
		const data = await Promise.resolve("Working !");
		return data;
	}

	async demo() {
		const data = await mysqlConnection("SELECT * FROM test");
		return data;
	}
}

export const userService = new UserService();
