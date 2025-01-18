'use client'
import {useState,useEffect} from 'react'
import {User,coerceToUserType,Nullable} from '@/app/lib/definitions';

// gets the user object from the auth0 endpoint
// treats the fetched object as locally defined User type
async function fetchUser() {
    const response = await fetch('/auth/profile');
    if (response.ok) {
      const auth0User = await response.json();
      const user = coerceToUserType(auth0User);
      return user;
    }

    throw new Error('Failed to fetch user data');
}

export function useUser() {
    const [user,setUser] = useState<Nullable<User>>(undefined);

    useEffect(() => {
        const myFetchUser = async () => {
            const fetchedUser = await fetchUser();
            setUser(fetchedUser);
        }

        myFetchUser();
    },[])

    return {user: user};
}