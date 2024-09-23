import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProductsSkeleton({ amount }: { amount: number }) {
    return (
        <div style={{ flexGrow: 1, marginLeft: 75, marginTop: 35, marginBottom: 10 }}>
            <div style={{
                display: 'grid', rowGap: '50px', columnGap: '50px',
                gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))'
            }}>
                {[...Array(amount)].map((_, i) => {
                    return (
                        <div key={'product info' + i} style={{
                            display: 'flex', flexDirection: 'column',
                            rowGap: 8
                        }}>
                            <Skeleton height={300} width={260} />
                            <Skeleton height={30} width={260} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}