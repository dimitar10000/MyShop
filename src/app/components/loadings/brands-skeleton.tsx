import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function BrandsSkeleton({ amount }: { amount: number }) {
    return (
        <div>
            <div className='mb-4'
                style={{ marginLeft: "5%" }}>
                <Skeleton height={40} width={180} />
            </div>

            <div style={{ width: "90%", height: "20%", marginLeft: 60 }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    {[...Array(amount)].map((_, i) => {
                        return (
                            <div key={'brand' + i} style={{
                                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Skeleton height={80} width={80} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}