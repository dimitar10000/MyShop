'use client'

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTheme } from '@mui/material/styles';

export default function BreadcrumbTemplate({ labels, links, includeAllLinks = false}: { labels: string[], links: string[],
    includeAllLinks?: boolean
 }) {

    const labelsNum = labels.length;
    const theme = useTheme();

    const breadcrumbs = labels.map((label, i) => {
        if(includeAllLinks) {
            return (
                <Link key={label} underline='hover' color="inherit" href={links[i]}>
                    {label}
                </Link>
            );
        }

        return (
            (i !== labelsNum - 1)
                ? (<Link key={label} underline='hover' color="inherit" href={links[i]}>
                    {label}
                </Link>)
                : (<Typography key={label} color={'text.primary'}>
                    {label}
                </Typography>))
    })

    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx= {{paddingLeft: 5, paddingTop: 1, paddingBottom: 1,
                bgcolor: theme.palette.primary.dark
            }}
        >
            {breadcrumbs}
        </Breadcrumbs>
    )
}