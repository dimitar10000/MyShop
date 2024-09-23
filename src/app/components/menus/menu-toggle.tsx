'use client'
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import { divider } from './utils';
import Link from "next/link";

export function useMenuToggle(anchorEl: null | HTMLElement, setAnchorEl: (arg: null | HTMLElement) => void,
    open: boolean, titleColor: string, buttonContent: string, buttonLink: string, menuItems: any[]) {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(timeoutId) {
            clearTimeout(timeoutId);
        }
        setAnchorEl(event.currentTarget);
    };

    // necessary delay to prevent menu from closing
    // if mouse leaves button and hovers over menu items
    const handleClose = () => {
        timeoutId = setTimeout(() => {
            setAnchorEl(null);
        }, 0);
    };

    const handleMenuEnter = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // keep the button active color when hovering over menu items
        if (anchorEl) {
            anchorEl.classList.replace("bg-gray-700", "bg-gray-800");
            anchorEl.classList.replace(titleColor, "text-orange-700");
        }
    }

    const handleMenuClose = () => {
        // return the button color when mouse leaves menu items
        if (anchorEl) {
            anchorEl.classList.replace("bg-gray-800", "bg-gray-700");
            anchorEl.classList.replace("text-orange-700", titleColor);
        }
        
        timeoutId = setTimeout(() => {
            setAnchorEl(null);
        }, 0);
    }

    const button = <Link href={buttonLink}>
        <Button
            id="toggle-button"
            aria-controls={open ? 'dropdown-menu' : undefined}
            aria-haspopup="menu"
            aria-expanded={open ? 'true' : undefined}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            sx={{ zIndex: (theme) => theme.zIndex.modal + 1, textTransform: 'none' }}
            className={`bg-gray-700 ${titleColor} hover:bg-gray-800 hover:text-orange-700
        text-lg px-3`}
        >
            {buttonContent}
        </Button>
    </Link>;

    const itemsCount = menuItems.length;

    const items = menuItems.map((item, i) => {
        return (
            <div key={item.key}>
                {item}
                {(i !== itemsCount - 1)
                    ? divider
                    : null}
            </div>
        )
    });

    const menu = <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
            'aria-labelledby': 'toggle-button',
            'onMouseEnter': handleMenuEnter,
            'onMouseLeave': handleMenuClose
        }}
    >
        {items}
    </Menu>

    return [button, menu];
}