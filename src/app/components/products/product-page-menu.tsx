'use client'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import PriceSlider from './price-slider/price-slider';
import {useProducts} from '@/app/lib/product/products-provider';
import {getInitialPriceRange} from '@/app/lib/util-funcs';
import {useState, useEffect,Suspense} from 'react';

// labels["men's clothes"] = [["jeans", <address of jeans image>]]
export default function ProductPageMenu({ labels }: { labels: { [key: string]: string[][] }}) {
    const {products} = useProducts();
    const [initialPrices, setInitialPrices] = useState<number[]>([0,0]);
    const numKeys = Object.keys(labels).length;

    useEffect(() => {        
        if(products) {
            const range = getInitialPriceRange(products);
            setInitialPrices(range);
        }
    },[products]);

    return (
        <div className='w-1/5'>
            <div className='text-lg text-slate-100 mb-1 ms-3 font-medium'> Categories </div>
            <Divider />
            {Object.entries(labels).map(([key,value],i) => {
                return (<div key={'accordion' + i}>
                    <Accordion defaultExpanded disableGutters>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            id='panel-header'
                            aria-controls="panel-content"
                        >
                            <div> {key} </div>
                        </AccordionSummary>
                        <AccordionDetails
                            id='panel-content'
                            aria-labelledby='panel-header'>
                            <div className='flex flex-col gap-y-3'>
                                {value.map((item,i) => {
                                    return (
                                        <Link key={'item' + i}
                                              href={item[1]}
                                              className='hover:bg-gray-500'>
                                            {item[0]}
                                        </Link>
                                    )
                                })}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    {i !== numKeys - 1 ? <Divider sx={{height: 10}}/> : null}
                    </div>
                )
            })
            }

            <div className='mt-16 mb-10'>
                <div className='text-lg text-slate-100 mb-3 ms-3 font-medium'>
                    Select price range:
                </div>
                <Suspense>
                    <PriceSlider initialRange={initialPrices}/>
                </Suspense>
            </div>
        </div>
    )
}