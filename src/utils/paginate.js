export const paginate = (count, limit) => {
	const pagination = {
		totalItems: count,
		totalPages: Math.ceil(count / (limit || count)) || 0
	};
	return pagination;
};
