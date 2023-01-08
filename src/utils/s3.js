import AWS from "aws-sdk";
import { envConfig } from "#configs/index";
import { logger } from "#helpers/index";
const tk = require("timekeeper");

const s3 = new AWS.S3({
	region: envConfig.AWS_REGION,
	accessKeyId: envConfig.AWS_ACCESS_KEY_ID,
	secretAccessKey: envConfig.AWS_ACCESS_KEY_SECRET
});

const fileUrl = fileName => {
	return `https://${envConfig.AWS_ASSETS_BUCKET}.s3.${envConfig.AWS_REGION}.amazonaws.com/${fileName}`;
};

// round the time to the last 10-minute mark
const getTruncatedTime = () => {
	const currentTime = new Date();
	const d = new Date(currentTime);

	d.setHours(Math.floor(d.getHours() / 6) * 6);
	d.setMinutes(0);
	d.setSeconds(0);
	d.setMilliseconds(0);

	return d;
};

export const uploadFile = (file, fileName, fileType, directory) => {
	return new Promise((resolve, reject) => {
		try {
			const params = {
				Bucket: `${envConfig.AWS_ASSETS_BUCKET}/${directory}`,
				Key: fileName,
				ContentType: fileType,
				Body: file.buffer
			};
			s3.upload(params, (err, data) => {
				if (err) {
					logger.error(err);
					reject(new Error("Error uploading file. Please try again."));
				}
				data.fileName = fileName;
				resolve(data);
			});
		} catch (error) {
			logger.error(error);
			reject(new Error(`Something went wrong while uploading file. Please try again.${error.message}`));
		}
	});
};

export const getSignedUrl = (fileName, directory) => {
	return new Promise((resolve, reject) => {
		try {
			const s3Params = {
				Bucket: `${envConfig.AWS_ASSETS_BUCKET}/${directory}`,
				Key: fileName,
				Expires: 25200
			};

			s3.getSignedUrl("getObject", s3Params, (err, data) => {
				if (err) {
					reject(new Error(err.message));
				}
				resolve({
					fileName,
					signedRequest: data,
					url: fileUrl(fileName)
				});
			});
		} catch (error) {
			reject(new Error("Something went wrong while loading file. Please refresh."));
		}
	});
};

export const deleteFiles = (files, directory) => {
	return new Promise(resolve => {
		try {
			const deleteParam = {
				Bucket: `${envConfig.AWS_ASSETS_BUCKET}`,
				Delete: { Objects: [] }
			};

			files.forEach(file => {
				deleteParam.Delete.Objects.push({ Key: `${directory}/${file}` });
			});

			s3.deleteObjects(deleteParam, (err, data) => {
				if (err) {
					resolve(null);
				} else {
					resolve(data);
				}
			});
		} catch (error) {
			resolve(null);
		}
	});
};

// cache-friendly signing
export const getCachedSignedUrl = (fileName, directory) => {
	return new Promise((resolve, reject) => {
		try {
			const s3Params = {
				Bucket: `${envConfig.AWS_ASSETS_BUCKET}/${directory}`,
				Key: fileName,
				Expires: 25200
			};

			const url = tk.withFreeze(getTruncatedTime(), () => {
				return s3.getSignedUrl("getObject", s3Params);
			});

			resolve({
				fileName,
				signedRequest: url,
				url: fileUrl(fileName)
			});
		} catch (error) {
			reject(new Error("Something went wrong while loading file. Please refresh."));
		}
	});
};

export const getFile = async ({ fileName }) => {
	const params = {
		Bucket: envConfig.AWS_ASSETS_BUCKET,
		Key: fileName
	};
	const res = await s3.getObject(params).promise();
	return res.Body;
};

export const putFile = ({ buffer, fileName }) => {
	const params = {
		Bucket: envConfig.AWS_ASSETS_BUCKET,
		Key: `${fileName}`,
		Body: buffer
	};
	return s3.putObject(params).promise();
};
