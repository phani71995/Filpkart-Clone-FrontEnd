

import Baner from "../Baner";
import Carousel from "../Carousel";
import HorizentalProduct from "./HorizentalProduct";
import VerticalProducts from "./VerticalProducts";

function Home() {
        return (
                <>
                        <div className="Banergap bg-neutral-100"></div>
                        <div className="HomeMainSection bg-neutral-100">

                                <Baner />
                                <Carousel />
                                <HorizentalProduct category="mobiles" title="Top mobiles" />
                                <VerticalProducts category="televisions" title="Top televisions" />
                                {/* <HorizentalProduct category="airpodes" title="Top airpodes" />
                                <HorizentalProduct category="earphones" title="Top earphones" /> */}
                                <HorizentalProduct category="camera" title="Top Camera" />
                                <HorizentalProduct category="airpodes" title="Top airpodes" />
                                <HorizentalProduct category="trimmers" title="Top trimmers" />
                                <HorizentalProduct category="printers" title="Top printers" />
                                <HorizentalProduct category="speakers" title="Top speakers" />
                        </div>
                </>);
}
export default Home