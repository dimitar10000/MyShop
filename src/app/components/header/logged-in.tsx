import ProfileMenu from '@/app/components/menus/profile-menu';
import { UserProfile } from '@auth0/nextjs-auth0/client';

export default function LoggedIn({ user }: { user: UserProfile }) {
    return (
        <ProfileMenu user={user} />
    )
}