import ProfileMenu from '@/app/components/menus/profile-menu';
import { UserProfile } from '@auth0/nextjs-auth0/client';

export default function LoggedIn({user} : {user: UserProfile}) {
    return (
        <div className="flex flex-row items-center ml-10 mr-20">
                <ProfileMenu user={user}/>
        </div>
    )
}