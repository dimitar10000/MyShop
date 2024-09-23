'use client'
import Button from '@mui/material/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Nullable } from '@/app/lib/definitions';

export default function ProfileButton({ href, label, color }: { href: string, label: string, color?: Nullable<string> }) {
    const currentPath = usePathname();
    const activeButton = (currentPath === href); // the current URL corresponds to button link

    return (
        <Button variant='contained'
            sx={{
                backgroundColor: activeButton ? 'grey.800' : 'grey.700',
                borderColor: 'grey.900',
                textTransform: 'none',
                transition: 'none',
                border: '1px solid',
                height: '40px',
                width: '300px',
                ':hover': {
                    backgroundColor: 'grey.800',
                }
            }}>
            <Link href={href} className='text-base'
            style={{color: color ? color : 'white'}}>
                {label}
            </Link>
        </Button>
    )
}