'use client'
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { NestedMenuItem } from 'mui-nested-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercent } from '@fortawesome/free-solid-svg-icons';
import styles from './menus.module.css';
import Image from 'next/image'
import { useMenuToggle } from './menu-toggle';
import { addNestedItems } from './utils';
import Link from 'next/link';

export default function WomenMenu() {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const clothes = [["Skirts",'/products/women/skirts'],
                    ["Dresses",'/products/women/dresses'],
                    ["Blouses",'/products/women/blouses']];

    const shoes = [["Sandals",'/products/women/sandals'],
                  ["High Heels",'/products/women/high-heels'],
                  ["Ankle Boots",'/products/women/ankle-boots']];

    const keyPrefix = "women_item";

    const menuItems = [
        <NestedMenuItem key={keyPrefix + 0} className={`${styles['menu-item']} hover:cursor-default`} parentMenuOpen={open}
            label={"Clothes"} leftIcon={<Image src={"/menu-images/dress.png"} alt="icon of dress" height={22} width={22} />}
            rightIcon={null}>
            {addNestedItems(clothes)}
        </NestedMenuItem>,

        <NestedMenuItem key={keyPrefix + 1} className={`${styles['menu-item']} hover:cursor-default`} parentMenuOpen={open}
            label={"Shoes"} leftIcon={<Image src={"/menu-images/high-heel.png"} alt="icon of high heel" height={22} width={22} />}
            rightIcon={null}>
            {addNestedItems(shoes)}
        </NestedMenuItem>,

        <MenuItem key={keyPrefix + 2} className={`${styles['menu-item']} text-red-500`}>
            <FontAwesomeIcon size="lg" icon={faPercent} color="red" />
            <Link href='/products/women/sale'>
                On Sale
            </Link>
        </MenuItem>
    ];

    const [button, menu] = useMenuToggle(anchorEl, setAnchorEl, open, "text-pink-500", "Women",'/products/women', menuItems);

    return (
        <div>
            {button}
            {menu}
        </div>
    )
}