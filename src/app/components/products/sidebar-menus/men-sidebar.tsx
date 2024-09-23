import ProductPageMenu from "../product-page-menu";

const labels = {
    "Men's clothes": 
    [["Jeans",'/products/men/jeans'],
    ["Shirts", '/products/men/shirts'],
    ["T-shirts", '/products/men/tshirts']],

    "Men's shoes":
    [["Sneakers",'/products/men/sneakers'],
    ["Boots",'/products/men/boots'],
    ["Slippers",'/products/men/slippers']]
};

export default function MenSidebar() {
    return (
        <ProductPageMenu labels={labels}/>
    )
}