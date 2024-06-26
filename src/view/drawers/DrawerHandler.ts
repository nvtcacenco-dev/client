export interface DrawerProps {
   
    onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
    
    open: boolean;
    id: string;
    direction: "bottom" | "left" | "right" | "top" | undefined;
    
  }

