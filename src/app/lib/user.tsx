'use client'
import {useState,useEffect} from 'react'
import {User} from '@/app/lib/definitions';

async function fetchUser() {
    const response = await fetch('/auth/profile');
    if (response.ok) {
      const user: User = await response.json();
      console.log('user is ', user);
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
    },[])

    return {user: user};
}