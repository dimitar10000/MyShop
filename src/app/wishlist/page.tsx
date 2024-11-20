import BreadcrumbTemplate from '@/app/components/breadcrumbs/breadcrumb-template';
import { getSession } from '@auth0/nextjs-auth0';
import { Wishlist as ListType} from '@/app/lib/definitions';
import WishlistBox from '@/app/components/wishlist/wishlist-box';
import {fetchListItems} from '@/app/lib/fetch-list-items';

export default async function Wishlist() {
    const session = await getSession();
    const user = session?.user;
    let data: ListType['items'] | null;

    data = await fetchListItems(user);

    console.log("list items on wishlist page ", data);

    return (
    <div style={{ marginLeft: "5%", marginRight: "5%" }} className='mt-1'>
        <BreadcrumbTemplate labels={["Home", "My Wishlist"]} links={['/']}/>

        <div className='mt-5'>
            <div className="text-2xl font-semibold"> My Wishlist </div>

            <div className='mt-5'>
                <WishlistBox productsData={data}/>
            </div>

        </div>
    </div>
    );
}