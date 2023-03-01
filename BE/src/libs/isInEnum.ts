export const isInEnum = <E>(e: E) => (i: any): i is E[keyof E] => Object.values(e).includes(i as E[keyof E]);
