import React, { useEffect, useRef, useState } from 'react';
import FeachDataByCategory from '../../helper/FeachDataByCategory';
import { backendapi } from '../../helper/Data';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProductscrollTop from '../../helper/ScrollTop';

const HorizentalProduct = ({ category, title }) => {
    const [data, setData] = useState([]);

    const containerRef = useRef(null);



    const fetchData = async (category) => {
        try {
            const fetchData = await FeachDataByCategory(category);
            setData(fetchData.data);
            //console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData(category);
    }, [category]);

    const onMoveleft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: -200, // Adjust scroll amount as needed
                behavior: 'smooth'
            });
        }
    };

    const onMoveright = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: 200, // Adjust scroll amount as needed
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <div className='container carddiv'>
                {data.length > 6 ? (
                    <>
                        <div className='iconLeft'><FaChevronLeft onClick={onMoveleft} /></div>
                        <div className='iconRight'><FaChevronRight onClick={onMoveright} /></div>

                    </>
                ) : null}
                {data.length > 0 ? (
                    <>

                        <div style={{ fontSize: "25px", fontWeight: "800" }}>{title}</div>
                    </>
                ) : null}


                <div style={{ marginTop: "5px", paddingBottom: "10px", overflowX: 'auto', overflow: "hidden" }} ref={containerRef}>
                    <div className='cardMain' style={{ display: 'flex', gap: '20px' }}>
                        {data ? (data?.map((product, index) => (
                            <div key={index} className='cardSection'>
                                <Link to={`/detailitem/${product._id}/${product.category}`}>
                                    <div className="card h-100" style={{ width: "12rem", height: "16rem", border: "1px solid gray" }} onClick={() => ProductscrollTop}>
                                        <img className="card-img-top" src={`${backendapi}/uploads/${product?.category}/${product?.productImg[0]}`} alt="Card image cap" style={{ width: "9rem", height: "10rem", margin: "5px auto 0px auto", objectFit: "contain" }} />
                                        <div className="card-body">
                                            <p className="card-text">{product.productName}</p>
                                        </div>
                                    </div></Link>
                            </div>
                        ))) : ("loading...")}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HorizentalProduct;
