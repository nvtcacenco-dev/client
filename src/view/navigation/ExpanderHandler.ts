import { Categories } from "../../utils/types";

export interface ExpanderProps{
    
    categories: Categories[] | undefined;
    urlEndpoint?: string;
    isLoading?: boolean;
    isDesktop?: boolean;
    
}