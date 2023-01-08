import { getConnection } from "#helpers/index";
import { pkgConfig } from "#configs/index";

/**
 * GET /health
 */
export const getHealth = async (req, res, next) => {
	try {
		await getConnection();
		res.jsend.success({
			name: pkgConfig.APP_NAME,
			version: pkgConfig.APP_VERSION,
			timestamp: new Date().toISOString()
		});
	} catch (error) {
		next(error);
	}
};
