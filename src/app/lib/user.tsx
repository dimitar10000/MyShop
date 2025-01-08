'use client'
import {useState,useEffect} from 'react'
import {User} from '@/app/lib/definitions';

async function fetchUser() {
    const response = await fetch('/api/auth/me');
    if (response.ok) {
      const user: User = await response.json();
      return user;
    }

    throw new Error('Failed to fetch user data');
}

export function useUser() {
    const [user,setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const myFetchUser = async () => {
            const fetchedUser = await fetchUser();
            setUser(fetchedUser);
        }

        myFetchUser();
    },[user,setUser])

    return {user: user};
}