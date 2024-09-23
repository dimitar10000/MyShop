import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function SocialMediaLinks() {
    return (
        <div className="flex flex-col">
                    <div className='text-2xl mb-4 font-medium'> Find us on social media </div>
                    <div className='flex flex-row justify-evenly gap-1 [&>*:hover]:cursor-pointer'>
                        <FacebookIcon sx={{ fontSize: 35 }} />
                        <InstagramIcon sx={{fontSize: 35}} />
                        <PinterestIcon sx={{fontSize: 35}} />
                        <TwitterIcon sx={{fontSize: 35}} />
                        <LinkedInIcon sx={{fontSize: 35}} /> 
                    </div>
                </div>
    )
}