import { join, extname } from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, join(".data", "files"));
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}-${Date.now()}${extname(file.originalname)}`);
  }
});

export const uploadMiddleware = fieldName => {
  return multer({ storage }).single(fieldName);
};
