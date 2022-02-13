/* eslint-disable require-unicode-regexp */
export const escapeRegExp = string => {
	return string.replace(/['."*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
};
