'use client'
import { Pagination as PaginationMUI } from '@mui/material';
import { useState } from 'react';
import Stack from '@mui/material/Stack';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Pagination({ pagesNum }: { pagesNum: number }) {
    const path = usePathname();
    const searchParams = useSearchParams();
    const [currPage, setCurrPage] = useState<number>(1);
    const { replace } = useRouter();

    const changeHandler = (event: React.ChangeEvent<unknown>, value: number) => {
        const paramsObj = new URLSearchParams(searchParams);
        paramsObj.set("page",value.toString());
        replace(`${path}?${paramsObj.toString()}`);
        setCurrPage(value);
    };

    return (
        <Stack spacing={2} alignItems={'center'}>
            <PaginationMUI count={pagesNum} variant="outlined"
                shape="rounded" color="standard" size="large"
                page={currPage} onChange={changeHandler}/>
        </Stack>
    )
}