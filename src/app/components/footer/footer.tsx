import LeftLinks from './left-links';
import ClientsLinks from './clients-links';
import CompanyLinks from './company-links';
import SocialMediaLinks from './social-media-links';

export default function Footer() {
    const companyLinks = ["About us", "Business Conditions", "Data protection policy", "Cookies",
        "Delivery and payments"];

    const clientsLinks = ["Contact and help", "Size table", "My account", "Order history",
        "Check order status"];

    return (
        <>
            <div className="flex flex-row justify-evenly items-start p-5">
                <LeftLinks/>
                <CompanyLinks companyLinks={companyLinks}/>
                <ClientsLinks clientsLinks={clientsLinks}/>
                <SocialMediaLinks />
            </div>
        </>
    )
}