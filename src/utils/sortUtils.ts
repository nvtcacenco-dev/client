export function findSortTrue(state: any): { option: string; order: string } | undefined {
    const activeSortOption = Object.keys(state).find((key) => state[key as keyof typeof state].state);
    if (activeSortOption) {
        const order = state[activeSortOption as keyof typeof state].order;
        return { option: activeSortOption, order: order };
    }
    return undefined;
}