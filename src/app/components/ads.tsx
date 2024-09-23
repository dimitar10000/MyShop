import Image from "next/image";

export default function Ads() {
    return (
        <div style={{ marginLeft: "5%", marginRight: "5%" }}>
            <div className="flex flex-row justify-center gap-8 flex-nowrap">
                {[...Array(3)].map((x, i) => {
                    return (
                        <div key={i}>
                            <Image src={"https://placehold.co/400x250/000000/FFFFFF/png?text=AD"}
                                alt={"placeholder image for a shop ad"}
                                width={380}
                                height={250}
                                className="my-4"
                            />
                        </div>);
                })}

            </div>
        </div>
    )
}