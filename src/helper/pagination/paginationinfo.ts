export function generatePaginationInfo(
    totalItems: number,
    totalCount: number,
    page: number,
    limit: number
) {
    const hasNextPage = (page * limit) < totalCount;
    const totalPage = Math.ceil(totalCount / limit);
    return {
        meta: { totalItems, totalCount, hasNextPage, totalPage }
    };
}