const childProcess = require("child_process");

class UserService {
	async test() {
		const data = await Promise.resolve("Working !");
		return data;
	}

	/**
	 *
	 * @param {string} command
	 * @param {object} args
	 * @param {object} options
	 * @param {string} address
	 * @returns {Promise<string>}
	 * This function runs the myth script and returns the result
	 */
	_runScript(command, args, options) {
		// eslint-disable-next-line no-unused-vars
		return new Promise((resolve, reject) => {
			const child = childProcess.spawn(command, args, options);
			let result = "";
			child.stdout.on("data", data => {
				result += data.toString();
			});
			child.on("close", () => resolve(result));
		});
	}

	/**
	 * This function analyzes the contract and returns the result
	 */
	// eslint-disable-next-line no-unused-vars
	async analyzeContract(reqInfo, fileInfo) {
		try {
			let userId;
			const user = await this._checkIfUserExists(reqInfo.email);
			if (!user) {
				userId = await this._insertUser({
					name: reqInfo.name,
					email: reqInfo.email,
					contact_number: reqInfo.contact_number,
					company: reqInfo.company
				});
			} else {
				// eslint-disable-next-line no-unused-vars
				userId = user.user_id;
			}

			return {
				data: null,
				message: "Analysis report will be sent to registered email address!"
			};
		} catch (err) {
			throw err;
		}
	}
}

export const userService = new UserService();
