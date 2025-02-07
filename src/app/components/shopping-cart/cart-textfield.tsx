import React from 'react';
import { Dispatch,SetStateAction } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addToCart, removeFromCart } from '@/app/actions/shopping-cart';
import { ShoppingCartItemType,Nullable } from '@/app/lib/definitions';
import { User } from '@/app/lib/definitions';
import { useCart } from '@/app/lib/cart/cart-provider';

interface TextfieldType {
    user: Nullable<User>,
    item: ShoppingCartItemType,
    textBoxValue: string,
    setTextBoxValue: Dispatch<SetStateAction<string>>
}

export default function CartTextfield({ user, item, textBoxValue, setTextBoxValue }: TextfieldType) {
    const {setCart} = useCart();
    
    return (
        <OutlinedInput
            sx={{
                width: 110,
                input: {
                    textAlign: 'center'
                },
                '& fieldset': {
                    borderColor: 'black'
                },
                '&:hover fieldset': {
                    borderColor: 'black'
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderWidth: 2
                }
            }}
            onChange={(e) => {
                // if value turns empty or <= 0
                if (e.target.value === "" ||
                    e.target.value === "0" ||
                    e.target.value === "-"
                ) {
                    e.target.value = "1";
                }

                setTextBoxValue(e.target.value);
            }}
            onBlur={async (e) => {
                const asNumber = Number(e.target.value);

                if (asNumber > item.quantity) {
                    const diff = asNumber - item.quantity;
                    item.quantity = asNumber;
                    const newCart = await addToCart(user?.sub, item, diff);
                    setCart(newCart);
                }
                else if (asNumber < item.quantity) {
                    const diff = item.quantity - asNumber;
                    item.quantity = asNumber;
                    const newCart = await removeFromCart(user?.sub, item, diff);
                    setCart(newCart);
                }

            }}
            value={textBoxValue}
            type='text'
            startAdornment={
                Number(textBoxValue) > 1
                    ? <InputAdornment position="start">
                        <IconButton
                            aria-label="decrease product number by 1"
                            onClick={async () => {
                                let asNumber = Number(textBoxValue);
                                asNumber--;
                                item.quantity = asNumber;

                                setTextBoxValue(asNumber.toString());
                                const newCart = await removeFromCart(user?.sub, item, 1);
                                setCart(newCart);
                            }}
                            edge="start"
                        >
                            <RemoveIcon style={{ width: 20, height: 20 }} />
                        </IconButton>
                    </InputAdornment>
                    : <InputAdornment position="start">
                        <IconButton disableRipple edge="start"
                            sx={{
                                '&:hover': {
                                    cursor: 'default'
                                }
                            }}>
                            <div style={{ width: 20, height: 20 }} />
                        </IconButton>
                    </InputAdornment>
            }
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="increase product number by 1"
                        onClick={async () => {
                            let asNumber = Number(textBoxValue);
                            asNumber++;
                            item.quantity = asNumber;

                            setTextBoxValue(asNumber.toString());
                            const newCart = await addToCart(user?.sub, item, 1);
                            setCart(newCart);
                        }}
                        edge="end"
                    >
                        <AddIcon style={{ width: 20, height: 20 }} />
                    </IconButton>
                </InputAdornment>
            }
        />
    )
}