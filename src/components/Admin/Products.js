
import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import ChangeProduct from './ChangeProduct';
import { backendapi } from '../../helper/Data';
const Products = () => {

    const [getAllproduct, updataAllproduct] = useState([])
    const [showEditProduct, updateEditProduct] = useState(false)
    const [updateProduct, updateUpdateProduct] = useState()

    const onEditHandler = (product) => {
        updateEditProduct(true);
        updateUpdateProduct(product);

    }
    useEffect(() => {
        fetchAllProduct();
    }, []);

    const fetchAllProduct = async () => {
        try {
            const fetchResponse = await fetch(`${backendapi}/admin/getAllproduct`, {
                method: "get",
                credentials: "include"
            });
            const response = await fetchResponse.json();
            console.log("product", response.data);
            if (response.success) {
                updataAllproduct(response.data);
                //toast.success("Data fetched successfully");
            } else {
                // toast.error(response.message || "Something went wrong!");
            }
        } catch (error) {
            console.error('Error:', error);
            //toast.error(error.message);
        }
    };


    const deletedProductHandler = async (product) => {
        console.log("product", product);
        try {
            const fetchResponse = await fetch(`${backendapi}/admin/deleteproduct`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ productId: product._id })
            });
            const response = await fetchResponse.json();
            console.log("product", response.message);
            if (response.success) {
                fetchAllProduct();
                //toast.success("Deletd Product successfully");
            } else {
                // toast.error(response.message || "Something went wrong!");
            }
        } catch (error) {
            console.error('Error:', error);
            //toast.error(error.message);
        }
    };
    return (
        <>
            <div>
                <div className="card  " >
                    <div className='row '>
                        {
                            getAllproduct.map((product) => {
                                return (
                                    <div className='col-3 mt-3  shadow  bg-white rounded' key={product._id}>
                                        <img className="card-img-top productImag" src={`${backendapi}/uploads/${product?.category}/${product?.productImg[0]}`} alt="Card image cap" />
                                        <div className="card-body">
                                            <p className="card-text">{product.productName}</p>
                                            <p className="card-text"> 	&#8377; {product.price}</p>

                                            <button data-toggle="modal" data-target="#exampleModal" onClick={() => { return onEditHandler(product) }}>
                                                <AiFillEdit className='editIcon' />
                                            </button>
                                            <button onClick={() => { return deletedProductHandler(product) }}>
                                                <MdDelete className='deleteIcon' />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }



                    </div>

                </div>
            </div >


            {/* tailwind method 
            
            <div className="bg-white">

                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {getAllproduct.map((product) => (
                            <div key={product.id} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={`http://localhost:4500/uploads/${product?.category}/${product?.productImg[0]}`}
                                        alt={product.imageAlt}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={product.href}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.productName}
                                            </a>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">	&#8377; {product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}

            {showEditProduct && <ChangeProduct productData={updateProduct} />}
        </>
    )
}

export default Products
