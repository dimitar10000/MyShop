import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import Link from 'next/link';

export default function LogIn() {
    return (

        <Link prefetch={false}
            className='flex flex-row gap-x-0 items-center hover:brightness-90'
            href="/api/auth/login">
            <PermIdentityOutlinedIcon fontSize="large" />
            <span className=""> Login </span>
        </Link>

    )
}