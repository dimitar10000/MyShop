import { alpha } from '@mui/material';
import { InputBase, InputBaseComponentProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import {useState, useRef} from 'react';
import {useSearchParams, useRouter} from 'next/navigation'


interface InputBaseType {
    placeholder: string,
    inputProps: InputBaseComponentProps
}

export default function StyledInput({ placeholder, inputProps }: InputBaseType) {
    const theme = useTheme();
    const searchParams = useSearchParams();
    const [myParamsObj, setMyParamsObj] = useState(new URLSearchParams(searchParams));
    const [showIcon, setShowIcon] = useState(false);
    const [hoveredIcon, setHoveredIcon] = useState(false);
    const inputRef = useRef<any>(null);
    const { replace } = useRouter();

    const handleClick = () => {
        
        if(inputRef.current) {
            inputRef.current.value = "";
            console.log(inputRef.current.value);
            inputRef.current.focus();
            updateSearchParams("");
            setHoveredIcon(false);
        }
    }

    const updateSearchParams = (paramsValue: string) => {
        const paramsObj = new URLSearchParams(searchParams);
        paramsObj.set('query', paramsValue);

        setMyParamsObj(paramsObj);
    }

    const executeSearchQuery = () => {
        replace(`/search?${myParamsObj.toString()}`);
    }

    return (
        <>
            <InputBase
                placeholder={placeholder}
                inputProps={inputProps}
                inputRef={inputRef}
                sx={{
                    color: alpha(theme.palette.common.white, 1),
                    width: '100%',
                    '& .MuiInputBase-input': {
                        padding: theme.spacing(1, 5, 1, 0),
                        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                        transition: theme.transitions.create('width',{delay: 100}),
                        [theme.breakpoints.up('sm')]: {
                            width: '34ch',
                            '&:focus': {
                                width: '40ch',
                            },
                        },
                        fontSize: 14
                    },
                    position: 'relative'
                }}
                onBlur={() => {
                    setTimeout(() => {
                        setShowIcon(false);
                    },100);
                }}
                onFocus={(e) => {
                    if(e.target.value !== '') {
                        setShowIcon(true);
                    }
                }}
                onChange={(e) => {
                    updateSearchParams(e.target.value);

                    if(e.target.value !== '') {
                        setShowIcon(true);
                    }
                    else {
                        setShowIcon(false);
                    }
                }}
                onKeyDown={(e) => {
                    if(e.key === "Enter") {
                        executeSearchQuery();
                    }
                }}
                />

            <div className='absolute top-2.5 right-1'>
                {showIcon && !hoveredIcon &&
                    <CancelIcon onMouseEnter={() => {
                        setHoveredIcon(true);
                    }}
                    sx={{cursor: 'pointer'}}
                    />}
                {showIcon && hoveredIcon &&
                    <CancelIcon onMouseLeave={() => {
                        setHoveredIcon(false);
                    }}
                    onClick={handleClick}
                    sx={{filter: 'brightness(80%)',
                        cursor: 'pointer'
                    }}
                    />}
            </div>
        </>
    )
}