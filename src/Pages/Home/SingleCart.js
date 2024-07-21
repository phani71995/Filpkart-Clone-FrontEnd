import React from 'react'
import { backendapi } from '../../helper/Data'
import { Link } from 'react-router-dom'
import { MdOutlineStarRate } from 'react-icons/md'

const SingleCart = ({ product }) => {
    return (
        <>
            <div className='product HomeMainSection '>

                <div className="container">
                    <div className="row">
                        {product?.map((product) => (
                            <div key={product._id} className="col-md-3 mt-4">
                                <Link className="text-dark text-decoration-none" to={`/detailitem/${product._id}/${product.category}`}>

                                    <div className="card h-100 ">
                                        <img src={`${backendapi}/uploads/${product?.category}/${product?.productImg[0]}`} alt={product.imageAlt} className="card-img-top" style={{ width: "200px", height: "200px", margin: "0 auto" }} />
                                        <div className="card-body">
                                            <div style={{ width: "100%", height: "50px" }}> <h5 className="card-title">{product.productName}</h5></div>
                                            <div style={{ width: "100%", height: "30px" }}><p className="card-text"> &#8377; {product.selling}</p></div>
                                            <div className='mr-4' style={{ display: "flex", alignItems: "center", gap: "10px" }} >
                                                <div className='mr-4' style={{ display: "flex", alignItems: "center", fontSize: "20px", backgroundColor: "green", width: "25%", height: "30px", borderRadius: "10px" }}><MdOutlineStarRate /><span style={{ fontSize: "16px", }}>{4.5}</span></div>
                                                <div className='ml-4'><img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt={product.imageAlt} style={{ width: "100%", height: "35px", objectFit: "contain" }} /></div>


                                            </div>


                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                        }
                    </div >
                </div ></div>
        </>
    )
}

export default SingleCart
