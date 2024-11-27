'use client'
import BreadcrumbTemplate from "../components/breadcrumbs/breadcrumb-template"
import ProfileButton from "../components/profile/profile-button"
import UserInfoForm from '../components/profile/user-info-form';
import { useUser } from '@auth0/nextjs-auth0/client';
import ProfileSkeleton from '@/app/components/loadings/profile-skeleton';

export default function Profile() {
    const { user } = useUser();

    if(!user) {
        return <ProfileSkeleton/>;
    }

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
                        <UserInfoForm user={user}/>
                    </div>

                </div>

            </div>)
    )
}