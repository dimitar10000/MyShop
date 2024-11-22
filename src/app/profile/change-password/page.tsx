'use client'
import BreadcrumbTemplate from "@/app/components/breadcrumbs/breadcrumb-template"
import ProfileButton from "@/app/components/profile/profile-button"
import { useUser } from '@auth0/nextjs-auth0/client';
import ChangePassForm from '@/app/components/profile/change-pass-form';

export default function ChangePassword() {
    const { user } = useUser();

    return (
        user && (<div style={{ marginLeft: "5%", marginRight: "5%" }} className='mt-1 mb-10'>
                <BreadcrumbTemplate labels={['Home', 'Profile']} links={['/']} />

                <div className='mt-5'>
                    <div className="text-2xl font-semibold"> Change password </div>

                    <div className="flex flex-row justify-between mt-3">
                        <ProfileButton href='/profile' label='Profile'/>
                        <ProfileButton href='/profile/orders' label='My orders'/>
                        <ProfileButton href='/profile/change-password' label='Change password'/>
                        <ProfileButton href='/profile/delete-account' label='Delete account' color='red'/>
                    </div>

                    <div className="mt-5">
                        <ChangePassForm />
                    </div>

                </div>

            </div>)
    )
}