
import { Product } from "../../utils/types";


export interface MatchedSubstring {
  substring: string;
  startIndex: number;
  endIndex: number;
}

export function findMatchedSubstrings(text: string, query: string): MatchedSubstring[] {
    const matchedSubstrings: MatchedSubstring[] = [];
    const words = text.split(/\s+/);
    words.forEach((word, index) => {
        if (word.toLowerCase().includes(query.toLowerCase())) {
            matchedSubstrings.push({
                substring: word,
                startIndex: text.indexOf(word),
                endIndex: text.indexOf(word) + word.length - 1
            });
        }
    });
    return matchedSubstrings;
}

export function calcCartSize(cart: {
  product: Product;
  quantity: number;
  size: string;
}[]): number { 
  let count = 0;
  cart.forEach(function (item) {
      count += item.quantity;
  })
  return count;
}
