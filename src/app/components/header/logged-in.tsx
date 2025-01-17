import ProfileMenu from '@/app/components/menus/profile-menu';
import { User } from '@/app/lib/definitions';

export default function LoggedIn({ user }: { user: User }) {
    return (
        <ProfileMenu user={user} />
    )
}