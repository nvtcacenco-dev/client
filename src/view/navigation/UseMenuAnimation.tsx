import { duration } from "@mui/material";
import { stagger, transform, useAnimate } from "framer-motion";
import { useEffect } from "react";

export function useMenuAnimation(isOpen: boolean | undefined, isDesktop: boolean | undefined) {
    const [scope, animate] = useAnimate();
  
    useEffect(() => {
      if (!isDesktop){
        const menuAnimations = isOpen 
        ? [
            [
              "li",
              { transform: "scale(1) translateX(0%)" , opacity: 1 , filter: "blur(0px)" },
              { delay: stagger(0.1), at: "-0.2", duration: 0.7 }
            ]
          ]
        : [
            [
              "li",
              { transform: "scale(0.25) translateX(-50%)", opacity: 0 , filter: "blur(2px)" },
              { delay: stagger(0.01, { from: "last" }), at: "<", duration: 0.25 }
            ],
           
          ];
  
      animate([
        [
          "path.top",
          { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
          { at: "<" }
        ],
        ["path.middle", { opacity: isOpen ? 0 : 1 }, { at: "<" }],
        [
          "path.bottom",
          { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
          { at: "<" }
        ],
        //@ts-ignore
        ...menuAnimations
      ]);
      }
      
    }, [isOpen]);
  
    return scope;
  }