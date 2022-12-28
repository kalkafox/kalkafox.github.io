

import { createContext, Dispatch, SetStateAction } from 'react';

export interface IContext {
    backgroundX: number;
    backgroundY: number;
}

export const BackgroundContext = createContext<IContext>({
    backgroundX: 0,
    backgroundY: 0
});
