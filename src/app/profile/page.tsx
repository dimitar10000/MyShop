'use client'
import BreadcrumbTemplate from "../components/breadcrumbs/breadcrumb-template"
import ProfileButton from "../components/profile/profile-button";
import UserInfoForm from '../components/profile/user-info-form';
import {getUser} from '@/app/actions/user';
import { useEffect,useState } from "react";
import {User,Nullable} from '@/app/lib/definitions';
import {useUser} from '@/app/lib/user';
import ProfileSkeleton from '@/app/components/loadings/profile-skeleton';

export default function Profile() {
    const { user } = useUser();
    const [myUser,setMyUser] = useState<Nullable<User>>(undefined);

    useEffect(() => {
        const getFunc = async () => {
            const fetchedUser = await getUser(user);

            if(fetchedUser) {
                setMyUser(fetchedUser);
            }
        }

        getFunc();

    },[user])

    if(!user) {
        return <ProfileSkeleton/>;
    }

    console.log("user", user);
    console.log('myuser',myUser);

    return (
        user && (<div style={{ marginLeft: "5%", marginRight: "5%" }} className='mt-1 mb-10'>
                <BreadcrumbTemplate labels={['Home', 'Profile']} links={['/']} />

                <div className='mt-5'>
                    <div className="text-2xl font-semibold"> User information </div>

                    <div className="flex flex-row justify-between mt-3">
                        <ProfileButton href='/profile' label='Profile'/>
                        <ProfileButton href='/profile/orders' label='My orders'/>
                        <ProfileButton href='/profile/change-password' label='Change password'/>
                        <ProfileButton href='/profile/delete-account' label='Delete account' color='red'/>
                    </div>

                    <div className="mt-5">
                        <UserInfoForm user={myUser!} updateUser={setMyUser}/>
                    </div>

                </div>

            </div>)
    )
}