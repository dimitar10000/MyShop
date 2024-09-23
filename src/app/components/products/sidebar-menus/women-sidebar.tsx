import ProductPageMenu from "../product-page-menu";

const labels = {
    "Women's clothes": 
    [["Skirts",'/products/women/skirts'],
    ["Dresses", '/products/women/dresses'],
    ["Blouses", '/products/women/blouses']],

    "Women's shoes":
    [["Sandals",'/products/women/sandals'],
    ["High Heels",'/products/women/high-heels'],
    ["Ankle Boots",'/products/women/ankle-boots']]
};

const links = [];

export default function WomenSidebar() {
    return (
        <ProductPageMenu labels={labels}/>
    )
}