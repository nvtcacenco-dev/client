

export interface ExpanderProps{
    isOpen?: boolean;
    isLoading?: boolean;
    isDesktop?: boolean;
    className?: string;
    setIsOpen?: (value: React.SetStateAction<boolean>) => void
}