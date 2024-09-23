import { createContext,RefObject } from 'react';

export const ScrollUpContext = createContext<RefObject<HTMLDivElement | null> | undefined>(undefined);