'use client'
import {useRouter} from 'next/navigation';
import {useState,useEffect} from 'react';

function LogoutRouter({activeState} : {activeState: boolean}) {
    const router = useRouter();

    useEffect(() => {
        const triggerLogout = () => {
            router.push('/auth/logout');
        }

        if(activeState) {
            triggerLogout();
        }
    },[activeState]);

    return (
        <div className='hidden'/>
    )
}

export function useLogout() {
    const [active, setActive] = useState<boolean>(false);
    const logoutRouter = <LogoutRouter activeState={active}/>

    return {logout: logoutRouter, activate: setActive};
}