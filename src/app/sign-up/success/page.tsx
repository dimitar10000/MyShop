import Link from 'next/link'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Page() {

    return (
        <div className=" bg-slate-400 text-center flex flex-col h-full">
                <div className='relative rounded-full h-20 w-20 mx-auto mb-5 mt-[30vh]'
                    style={{ backgroundColor: "#C0C0C0" }}>
                    <CheckCircleIcon color="success" style={{ height: "105px", width: "105px" }}
                        className='absolute -top-3 -left-3' />
                </div>

                <div className='text-4xl mb-2'> Your account was created successfully!</div>
                <div className='text-3xl'> You can
                    <Link href="/sign-in" className='underline ms-2 me-2'
                        style={{ color: "#1b034d" }}>sign in</Link>
                    here now.
                </div>
        </div>
    )
}