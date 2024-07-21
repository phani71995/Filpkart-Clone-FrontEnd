import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowUp } from "react-icons/md";
import { Link } from 'react-router-dom';
import arr from './Home/BannerList'
const Baner = () => {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };
    const handleMouseLeave = () => {
        setHovered(false);
    };
    return (
        <>
            <div className='BannerMainSection bg-white'>
                {arr.map((item) => (
                    <div className="BannerEachItem " key={item.id}>
                        <div className="BannerImage">
                            <Link to={`/bannercategory?category=${item.link}`}> <img alt="Grocery" src={item.imageId} /></Link>
                        </div>
                        <div className='BannerCategoryLable'>
                            <div> <span >{item.category}</span></div>
                            {/* {
                                item.arrow && <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> {hovered ? <span> <MdKeyboardArrowUp /></span> : <span> <IoIosArrowDown /></span>}</div>} */}


                        </div>
                    </div>)

                )}

            </div >
        </>

    )
}

export default Baner 
