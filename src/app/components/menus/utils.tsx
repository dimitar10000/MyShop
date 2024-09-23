import MenuItem from "@mui/material/MenuItem";
import styles from './menus.module.css';
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider';
import Link from 'next/link';

export const divider = <Box sx={{ m: 0 }}>
        <Divider className={`${styles.divider} `} />
    </Box>;

// adds items + link to each submenu (for men, women etc)
// items consists of [a,b] a - name of item, b - link to page
export const addNestedItems = (items: string[][]) => {
    const itemsCount = items.length;
  
    return (
      <div>
      {items.map((item,i) => {
        return (
          <div key={item[0]}>
            <MenuItem className={`${styles['menu-item']}`}>
            <Link href={item[1]}>
              {item[0].toString()}
            </Link>
          </MenuItem>
          {(i !== itemsCount - 1)
              ? divider
              : null}
        </div>
      )
      })}
      </div>
    )
  }