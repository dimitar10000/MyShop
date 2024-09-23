import MenMenu from "./men-menu";
import WomenMenu from "./women-menu";

export default function TopMenu() {

    return(
        <div className="flex flex-row ml-64 gap-3 justify-start">
            <MenMenu/>
            <WomenMenu/>
        </div>
    )

}