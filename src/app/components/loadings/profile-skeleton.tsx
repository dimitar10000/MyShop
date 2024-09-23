import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProfileSkeleton() {
    return (
        <div style={{ marginLeft: "5%", marginRight: "5%" }} className='mt-1 mb-10'>
                <Skeleton width={"100%"} height={50} />

                <div className='mt-5'>
                    <Skeleton height={32} width={200}/>

                    <div className="flex flex-row justify-between mt-3">
                        <Skeleton height={40} width={300}/>
                        <Skeleton height={40} width={300}/>
                        <Skeleton height={40} width={300}/>
                        <Skeleton height={40} width={300}/>
                    </div>

                    <div className="flex flex-row justify-center mt-5">
                        <Skeleton height={24} width={150}/>
                    </div>

                    <div className="mt-3">
                        <Skeleton width={'100%'} height={350}/>
                    </div>

                </div>

            </div>
    )
}