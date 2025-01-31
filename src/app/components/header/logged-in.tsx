import ProfileMenu from '@/app/components/menus/profile-menu';
import { User,Nullable } from '@/app/lib/definitions';

export default function LoggedIn({ user }: { user: Nullable<User> }) {
    return (
        <ProfileMenu user={user} />
    )
}