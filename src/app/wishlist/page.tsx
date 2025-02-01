import BreadcrumbTemplate from '@/app/components/breadcrumbs/breadcrumb-template';
import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { Wishlist as ListType} from '@/app/lib/definitions';
import WishlistBox from '@/app/components/wishlist/wishlist-box';
import {fetchListItems} from '@/app/lib/fetch-list-items';
import {User} from '@/app/lib/definitions';

export default async function Wishlist() {
    const auth0Client = new Auth0Client();
    const session = await auth0Client.getSession();
    const user = session?.user;
    const data: ListType['items'] | null = await fetchListItems(user as User);

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