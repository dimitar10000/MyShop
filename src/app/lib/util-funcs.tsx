import {
    ShoppingCartItemType, WishlistItemType, Nullable, Brand,
    UserCookie, Wishlist, isWishlist, isProduct2, isProduct3,
    Category,Product
} from '@/app/lib/definitions';
import EastRoundedIcon from '@mui/icons-material/EastRounded';

export function capitalizeFirstLetter(word: Nullable<string>) {
    if (!word) {
        return "";
    }

    return word[0].toUpperCase() + word.slice(1);
}

export function capitalizeAllWords(words: Nullable<string>) {
    if (!words) {
        return "";
    }

    let wordsArr = words.split(" ");
    wordsArr = wordsArr.map(word => capitalizeFirstLetter(word));
    const res = wordsArr.join(" ");

    return res;
}

export function addHyphens(words: Nullable<string>) {
    if (!words) {
        return "";
    }

    return words.replaceAll(' ', '-');
}

export function removeHyphens(word: string) {
    return word.replaceAll('-', ' ');
}

export function getCartItemsTotalPrice(cartItems: Nullable<ShoppingCartItemType[]>) {
    let totalPrice = 0;

    if (cartItems) {
        cartItems.forEach((item) => {
            if (item.discountedPercent) {
                const actualPrice = item.price - (item.discountedPercent * item.price) / 100.0;
                totalPrice += actualPrice * item.quantity;
            }
            else {
                totalPrice += item.price * item.quantity;
            }
        })
    }

    return totalPrice.toFixed(2);
}

export function getCartItemsTotalDiscount(cartItems: Nullable<ShoppingCartItemType[]>) {
    let totalDiscount = 0;

    if (cartItems) {
        cartItems.forEach((item) => {
            if (item.discountedPercent) {
                const discount = (item.discountedPercent * item.price) / 100.0;
                totalDiscount += discount * item.quantity;
            }
        })
    }

    return totalDiscount.toFixed(2);
}

// for displaying the price before and after discount for each item in the shopping cart menu
export function displayCartItemDiscount(cartItem: ShoppingCartItemType) {
    const discountString = " (-" + cartItem.discountedPercent! + "%)";
    const actualPrice = cartItem.price * cartItem.quantity -
        (cartItem.price * cartItem.discountedPercent!) / 100.0 * cartItem.quantity;

    const priceRounded = actualPrice.toFixed(2) + " $";

    const result = cartItem.discountedPercent
        ? <div className='flex flex-row'>
            <div> {discountString} </div>
            <div className='self-center'
                style={{ marginLeft: 2, marginRight: 2 }}>
                <EastRoundedIcon style={{ width: 18, height: 18 }} />
            </div>
            <div> {priceRounded} </div>
        </div>
        : "";

    return result;
}

export function getDiscountedPrice(price: number, discountedPercent: number | null, quantity: number) {
    if(discountedPercent === null) {
        return price.toFixed(2);
    }
    
    const actualPrice = (price -
        (discountedPercent * price) / 100.0)
        * quantity;

    return actualPrice.toFixed(2);
}

export function getBrandImageOfProduct(product: Nullable<Product | WishlistItemType | ShoppingCartItemType>, brands: Brand[] | null) {
    if(!product || !brands) {
        return "";
    }
    
    let brandName;

    if(isProduct3(product)) {
        brandName = product.brand.name;
    }
    else {
        brandName = product.brand;
    }

    const brandObj = brands.find(x => x.name === brandName);
    const brandImg = brandObj ? (brandObj.image ? brandObj.image : "") : "";

    return brandImg;
}

export function isInWishlist(item: Product | ShoppingCartItemType | null, list: Nullable<Wishlist> | UserCookie) {
    if (item === null) {
        return false;
    }

    let itemExists;
    const itemID = isProduct2(item) ? item.id : item.productID;

    if (list && isWishlist(list)) {
        itemExists = list.items.find((x) => x.productID === itemID);
    }
    else if (list && !isWishlist(list)) {
        itemExists = list.wishlist.find((x) => x.id === itemID);
    }
    else {
        itemExists = false;
    }

    if (itemExists) {
        return true;
    }

    return false;
}

export function getProductLink(item: Nullable<Product | WishlistItemType | ShoppingCartItemType>) {
    let categories: Category[] | string[];
    let itemID;
    
    if(!item) {
        return '/';
    }

    if(isProduct3(item)) {
        categories = item.categories;
        itemID = item.id;
    }
    else {
        if(item.categories) {
            categories = item.categories;
        }
        else {
            categories = [];
        }

        itemID = item.productID;
    }
    
    const sex = categories.find(cat => cat === "men" || cat === "women");
    let link;
    if (sex) {
        link = '/products/' + sex + '/' + itemID;
    }
    else {
        link = '/';
    }

    return link;
}

export function getInitialPriceRange(products: Product[]) {
    const prices = products.map(x => {
        const realPrice = Number(getDiscountedPrice(x.price,x.discountedPercent,1));
        return realPrice;
    });
    
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return [minPrice,maxPrice];
}

export function filterProductsByRange(minPrice: number, maxPrice: number, products: Product[]) {

    const filtered = products.filter(product => {
        const realPrice = Number(getDiscountedPrice(product.price, product.discountedPercent,1));
        return minPrice <= realPrice && realPrice <= maxPrice;
    });

    return filtered;
}

export function setLocalStorageForProduct(product?: Product | WishlistItemType | ShoppingCartItemType, brandImg?: string, inWishlist?: boolean) {
    
    if(product) {
        if(localStorage.getItem("product")) {
            localStorage.removeItem("product");
        }
        localStorage.setItem("product", JSON.stringify(product));
    }

    if(brandImg) {
        if(localStorage.getItem("product image")) {
            localStorage.removeItem("product image");
        }
        localStorage.setItem("product image", brandImg);
    }
    
    if(inWishlist !== undefined) {
        if(localStorage.getItem("in wishlist")) {
            localStorage.removeItem("in wishlist");
        }
        localStorage.setItem("in wishlist", String(inWishlist));
    }

    console.log('SET NEW LOCAL STORAGE');
    console.log(localStorage.getItem("product"));
    console.log(localStorage.getItem("product image"));
    console.log(localStorage.getItem("in wishlist"));
}