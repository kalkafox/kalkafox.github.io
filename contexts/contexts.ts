

import { createContext, Dispatch, SetStateAction } from 'react';

export interface IContext {
    terminalReady: boolean;
    setTerminalReady?: Dispatch<SetStateAction<boolean>>;
}

export const ReadyContext = createContext<IContext>({
    terminalReady: false,
    setTerminalReady: () => {},
});
