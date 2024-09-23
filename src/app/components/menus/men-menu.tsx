'use client'
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import {NestedMenuItem} from 'mui-nested-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShirt} from '@fortawesome/free-solid-svg-icons';
import {faPercent} from '@fortawesome/free-solid-svg-icons';
import styles from './menus.module.css';
import Image from 'next/image';
import {useMenuToggle} from './menu-toggle';
import {addNestedItems} from './utils';
import Link from 'next/link';

export default function MenMenu() {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const clothes = [["Jeans", '/products/men/jeans'],
                    ["Shirts", '/products/men/shirts'],
                    ["T-shirts",'/products/men/tshirts']];

    const shoes = [["Sneakers",'/products/men/sneakers'],
                  ["Boots",'/products/men/boots'],
                  ["Slippers",'/products/men/slippers']];

    const keyPrefix = "men_item";

    const menuItems = [
      <NestedMenuItem key={keyPrefix + 0} className={`${styles['menu-item']} hover:cursor-default`} parentMenuOpen={open}
      label={"Clothes"} leftIcon={<FontAwesomeIcon icon={faShirt} />} rightIcon={null}>
        {addNestedItems(clothes)}
      </NestedMenuItem>,
      
      <NestedMenuItem key={keyPrefix + 1} className={`${styles['menu-item']} hover:cursor-default`} parentMenuOpen={open}
      label={"Shoes"} leftIcon={<Image src={"/menu-images/sport-shoe.png"} alt="icon of shoe" height={22} width={22} />}
      rightIcon={null}>
        {addNestedItems(shoes)}
      </NestedMenuItem>,

      <MenuItem key={keyPrefix + 2} className={`${styles['menu-item']} text-red-500`}>
        <FontAwesomeIcon size="lg" icon={faPercent} color="red" />
          <Link href='/products/men/sale'>
            On Sale 
          </Link>
      </MenuItem>
    ];

    const [button,menu] = useMenuToggle(anchorEl,setAnchorEl,open,"text-green-300","Men",'/products/men',menuItems);

  return(
    <div>
      {button}
      {menu}      
    </div>
  )
}