import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { backendapi } from '../../helper/Data';
import AddToCart from '../../helper/AddToCart';
//import imgcc from "../../asserts/img1.jpg"
import HorizentalProduct from './HorizentalProduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux'
import { mycontext } from '../../other/Context';
import arr from './BannerList'
import { MdKeyboardArrowUp } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';




const ProductDescriptionComponent = ({ ProductDetails }) => {

    const [formattedDescription, setFormattedDescription] = useState('');


    useEffect(() => {
        if (ProductDetails?.description) {
            const arr = ProductDetails.description.split(" ");
            const arr1 = [];

            for (let i = 0; i < arr.length; i++) {
                arr1.push(arr[i]);  // Push current word into arr1

                // Check if we've reached approximately 20 words (i.e., every 20th word)
                if ((i + 1) % 15 === 0) {
                    arr1.push("\n");  // Add a newline after every 20th word
                } else {
                    arr1.push(" ");   // Add a space between words except at new lines
                }
            }

            // Join arr1 into a single string and update state
            setFormattedDescription(arr1.join(''));
        } else {
            setFormattedDescription("Product description is null or undefined.");
        }
    }, [ProductDetails?.description]);

    return (
        <div className='Description'>
            {formattedDescription}
        </div>
    );
};





/*============================================*/
function DetailItem() {
    const user = useSelector((state) => state.user.user)
    const navigate = useNavigate()
    const { getuserDetails, numProductInCart, NumerProductsInCart } = useContext(mycontext);
    const { productId, category } = useParams();
    const [ProductDetails, setProductDetails] = useState(null);
    const [token, setToken] = useState('');
    const [activeImage, setSelectImage] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [zoomImageCordinate, setZoomImage] = useState({
        x: 0, y: 0
    });
    const [zoomImage, updateZoom] = useState(false);
    // Banner
    const [hovered, setHovered] = useState(false);
    const [bannerChildList, setbannerChildList] = useState(false);
    const [subArray, setSubArray] = useState([]);






    const fetchByProductId = async () => {
        try {
            const response = await fetch(`${backendapi}/admin/featchByProductId`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId: productId }),
            });
            const result = await response.json();
            setProductDetails(result.data);
            setSelectImage(result.data.productImg[0]);
        } catch (error) {
            console.log(error);
        }
    };





    useEffect(() => {

        fetchByProductId();

    }, [productId]);




    const imageSelected = (product) => {
        setSelectImage(product);
    };
    useEffect(() => {

    }, [activeImage]);
    // const imghh = ProductDetails?.category ? `${backendapi}/uploads/${ProductDetails?.category}/${activeImage}` : '';
    // console.log(imghh); // Verify the generated URL

    // Generate the background image URL
    const backgroundImageUrl = ProductDetails?.category && activeImage
        ? `${backendapi}/uploads/${ProductDetails.category}/${activeImage}`
        : '';

    console.log("Generated URL:", ProductDetails);

    const backgroundImageStyle = {
        backgroundImage: backgroundImageUrl ? `url("${backgroundImageUrl}")` : `null`,
        width: "550px",
        height: "600px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${zoomImageCordinate.x * 100}% ${zoomImageCordinate.y * 100}%`,
        transition: 'transform 0.3s ease', // Add transition for smooth scaling
        transform: isHovered ? 'scale(.8)' : 'scale(1)', // Scale up on hover

    };
    const handleZoomImage = useCallback((e) => {
        updateZoom(true);
        setIsHovered(true)
        const { top, width, left, height } = e.target.getBoundingClientRect();
        console.log(top, width, left, height);
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        console.log(x, y);
        setZoomImage({
            x, y
        })

    }, [zoomImageCordinate]);
    const handlezoomLeve = () => {
        updateZoom(false);
        setIsHovered(false)
    }

    const addtocartHandler = async (id) => {


        console.log(user)
        if (!user) {
            toast.error("Please log in to add items to the cart");
            navigate("/signin");
            return;
        }

        try {
            const data = await AddToCart(id);
            console.log(data)
            if (data.error) {

                toast.error(data.message);

            } else {

                toast.success("Item added to cart successfully");
                NumerProductsInCart();
                navigate("/");
            }
        } catch (error) {
            console.error("An error occurred while adding to cart:", error);
            toast.error("An error occurred while adding to cart. Please try again.");
        }
    };


    const handleMouseEnter = (category) => {
        setHovered(true);
        setbannerChildList(true);
        const subArray = arr
            .filter((item) => item.category === category)
            .flatMap((item) => item.subcategory);
        setSubArray(subArray);

    }
    console.log(subArray)
    const handleMouseLeave = () => {
        setHovered(false);
        setbannerChildList(false);
    };
    return (
        <>
            <div >
                <ul className='DetailBanner'>

                    {arr.map((item) => (<li key={item.id} className='BannerCategoryLable'>{item.category}
                        {
                            item.arrow && <div value={item.category} onMouseEnter={(e) => handleMouseEnter(item.category)} onMouseLeave={handleMouseLeave}> {hovered ? <span> <MdKeyboardArrowUp /></span> : <span> <IoIosArrowDown /></span>}</div>}
                    </li>))}

                </ul>
                {/* subCategory */}
                {/* {
                    bannerChildList ? (<ul className='DetailBannerSubList'>
                        {
                            arr?.map((item) => (item?.subcategory?.map((list) => (<li key={item.id} className='BannerCategoryLable'>{list}</li>)))
                            )}

                    </ul>) : (null)
                } */}
                {bannerChildList ? (<ul className='DetailBannerSubList'>
                    {
                        subArray?.map((list) => (<li key={list} className='BannerCategoryLable'>{list}</li>))
                    }

                </ul>) : ("")}


            </div>


            <div className="HomeMainSection ">
                <div className='DetailItemMainSection '>
                    <div className='DetailImageContainer'>
                        <div>
                            {ProductDetails ? (
                                ProductDetails.productImg.map((product, index) => (
                                    <div key={index} style={{ border: "1px solid green", margin: "5px 5px" }}>
                                        <img
                                            className="card-img-top"
                                            src={`${backendapi}/uploads/${ProductDetails.category}/${product}`}
                                            onMouseEnter={() => imageSelected(product)}
                                            alt="Product"
                                            style={{ width: "8rem", height: "7rem", margin: "5px", objectFit: "contain", }}
                                        />
                                    </div>
                                ))
                            ) : (
                                "loading..."
                            )}
                        </div>
                        <div className='bigimage'>
                            <img
                                className="card-img-top"
                                src={`${backendapi}/uploads/${ProductDetails?.category}/${activeImage}`}
                                alt="Selected product"
                                onMouseMove={handleZoomImage}
                                onMouseLeave={handlezoomLeve}
                                style={{ width: "28rem", height: "28rem", margin: "1px auto 0px auto", objectFit: "contain", }}
                            />
                            <div className='mt-3 ButtonsDetail'>
                                <button className='btn btn-warning mr-3' onClick={() => addtocartHandler(ProductDetails?._id)}>ADD TO CART</button>
                                <button className='btn btn-danger'>BYE NOW</button>
                            </div>
                        </div>
                        {zoomImage &&
                            (<div className='ZoomImage' >

                                <div style={backgroundImageStyle}>

                                </div>
                            </div>)
                        }
                    </div>
                    {
                        !zoomImage &&
                        (<div className='productDetails'>
                            <h2 className='productHeading'>{ProductDetails?.productName}</h2>
                            <h3 className='mt-2 priceHeading'>Special price</h3>
                            <div className='price'>
                                <h3>&#8377; {ProductDetails?.selling}</h3>
                                <s>  <h3>&#8377;{ProductDetails?.price}</h3></s>
                            </div>
                            <h2 className='mt-2' s> Available offers</h2>

                            <div className='offers'>
                                <ul>
                                    <li>Bank Offer: Get ₹50 Instant Discount on first Flipkart UPI transaction on order of ₹200 and above T&C</li>
                                    <li>Bank Offer: 5% Cashback on Flipkart Axis Bank Card T&C</li>
                                    <li>Bank Offer: Flat ₹1,250 off on HDFC Bank Credit Card EMI Txns, Tenure: 6 and 9 months, Min Txn Value: ₹15,000 T&C</li>
                                    <li>Special Price: Get extra 8% off (price inclusive of cashback/coupon) T&C</li>
                                </ul>
                            </div>
                            <h2 className='mt-2' > Specifications</h2>
                            <div className='Description'>
                                <ProductDescriptionComponent ProductDetails={ProductDetails} />



                            </div>



                        </div>)
                    }

                </div>
                <div className=" bg-neutral-100">
                    <HorizentalProduct category={category} title={`Related ${category}`} />
                </div >
            </div >
        </>
    );
}

export default DetailItem;
