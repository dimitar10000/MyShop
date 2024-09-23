'use client'
import Box from '@mui/material/Box';
import { Brand } from '@/app/lib/definitions';
import styles from './search.module.css';
import Image from 'next/image';

export default function SearchBrandsBox({ brands }: { brands: Brand[] | null }) {

    return (
        <Box sx={{ flexGrow: 1, marginLeft: 3 }}>
            {brands &&
                <div className={styles['brands-wrapper']}>
                    {brands.map((item: Brand, index: number) => {
                        const name = item.name;
                        const image = item.image;

                        return (
                            <div key={'brand' + index}>
                                <div className='flex flex-col items-center gap-y-2'>
                                    <Image src={image!}
                                        alt={name}
                                        width={100}
                                        height={100}
                                    />
                                    <div> {name}</div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            }
        </Box>);
}