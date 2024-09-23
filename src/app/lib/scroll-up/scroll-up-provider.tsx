'use client'
import {useContext,useRef} from 'react'
import {ScrollUpContext} from './scroll-up-context'

export const useScrollUpDiv = () => useContext(ScrollUpContext);

export default function ScrollUpProvider({children} : {children: React.ReactNode}) {
    const divRef = useRef<HTMLDivElement | null>(null);

    return (
            <ScrollUpContext.Provider value={divRef}>
                <div ref={divRef}>
                    {children}
                </div>
            </ScrollUpContext.Provider>
    )
}