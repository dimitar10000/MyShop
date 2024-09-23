'use client'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { Button } from "@mui/material";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { useState } from 'react';
import styles from './menus.module.css';
import { UserProfile } from '@auth0/nextjs-auth0/client';

export default function ProfileMenu({ user }: { user: UserProfile }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    let timeoutId: NodeJS.Timeout | null = null;

    console.log(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {        
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        if (anchorEl) {
            anchorEl.classList.remove('brightness-90');
        }

        timeoutId = setTimeout(() => {
            setAnchorEl(null);
        }, 0);
    };

    const handleMenuEnter = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        if (anchorEl) {
            anchorEl.classList.add('brightness-90');
        }
    }

    let displayName;

    if(user.given_name && user.family_name) {
        displayName = user.given_name as string + ' ' + user.family_name as string;
    }
    else if(user.given_name) {
        displayName = user.given_name as string;
    }
    else {
        displayName = user.name;
    }

    return (
        <div>
            <Link href={'/profile'}>
                <Button
                    id="toggle-button"
                    aria-controls={open ? 'dropdown-menu' : undefined}
                    aria-haspopup="menu"
                    aria-expanded={open ? 'true' : undefined}
                    onMouseEnter={handleOpen}
                    onMouseLeave={handleClose}
                    className='flex flex-row gap-x-0 items-center hover:brightness-90'
                    sx={{ zIndex: (theme) => theme.zIndex.modal + 1, textTransform: 'none' }}
                >
                    <PermIdentityOutlinedIcon htmlColor='black' fontSize="large" />
                    <span className="text-black mt-2">
                        {displayName}
                    </span>
                </Button>
            </Link>
            <Menu
                id="dropdown-menu"
                anchorEl={anchorEl}
                open={open}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    horizontal: -20,
                    vertical: 0
                }}
                MenuListProps={{
                    'aria-labelledby': 'toggle-button',
                    'onMouseEnter': handleMenuEnter,
                    'onMouseLeave': handleClose
                }}
            >
                <MenuItem className={`${styles['menu-item']}`} onClick={handleClose}>
                    <Link href={'/profile'}>
                        Profile
                    </Link>
                </MenuItem>
                <MenuItem className={`${styles['menu-item']}`} onClick={handleClose}>
                    <Link href={'/profile/orders'}>
                        My orders
                    </Link>
                </MenuItem>
                <MenuItem className={`${styles['menu-item']}`} onClick={handleClose}>
                    <Link href={'/profile/change-password'}>
                        Change password
                    </Link>
                </MenuItem>
                <MenuItem className={`${styles['menu-item']}`} onClick={handleClose}>
                    <Link prefetch={false} href={'/api/auth/logout'}>
                        Log out
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    )

}