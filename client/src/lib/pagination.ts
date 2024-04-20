export const paginate = <T>(
	items: T[],
	current: number,
	pageSize: number
): T[] => {
	const startIndex = (current - 1) * pageSize
	const endIndex = startIndex + pageSize
	return items.slice(startIndex, endIndex)
}
