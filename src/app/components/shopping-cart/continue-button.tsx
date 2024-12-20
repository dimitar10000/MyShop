import Link from "next/link";
import { Button } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import tailwindConfig from '@/../tailwind.config'
import resolveConfig from 'tailwindcss/resolveConfig'

export default function ContinueButton({ sign, link }: {
    sign: string, link: string
}) {
    const fullConfig = resolveConfig(tailwindConfig);

    return (
        <Link href={link}>
            <Button variant="contained"
                size='large'
                endIcon={
                    <ChevronRightIcon />
                }
                sx={{
                    backgroundColor: fullConfig.theme.colors.orange[600],
                    '&:hover': {
                        backgroundColor: fullConfig.theme.colors.orange[700]
                    }
                }}
            >
                {sign}
            </Button>
        </Link>
    )
}