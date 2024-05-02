export function findSortTrue(state: any): { option: string; order: string } | undefined {
    const activeSortOption = Object.keys(state).find((key) => state[key as keyof typeof state].state);
    if (activeSortOption) {
        const order = state[activeSortOption as keyof typeof state].order;
        return { option: activeSortOption, order: order };
    }
    return undefined;
}


export function findSortTrueBool(state: any): boolean {
    const activeSortOption = Object.keys(state).find((key) => state[key as keyof typeof state].state);
    if (activeSortOption) {
        
        return true
    } else{
        return false
    }
    
}


export const handleSort = (value: boolean) => {
    return !value;
}

export const handleSortOption = (value: boolean) => {
    return value;
}


export function colorFilterRemoveSpaces(str: string) {
    switch (str.toLowerCase()) {
        case 'apricot':
            
            return '#FBCEB1';

        case 'denim':
            
            return '#89a0af';
        
        case 'cream':
            return '#FFFDD0';
        default:
            return str.replace(/\s/g, '');
    }
    
}