import React, { useContext, useEffect, useState } from 'react'
import { backendapi } from "../../helper/Data"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaPlus } from "react-icons/fa6"; import { FaMinus } from "react-icons/fa";
import { mycontext } from '../../other/Context';

const Cart = () => {
    const [products, updateAllProducts] = useState([]);
    const { getuserDetails, numProductInCart, NumerProductsInCart } = useContext(mycontext);
    const fetchProductSummary = async () => {
        try {
            const response = await fetch(`${backendapi}/admin/product-summary-cart`, {
                method: 'get',
                credentials: "include",
            });

            const ApiData = await response.json();
            console.log(ApiData.message);
            updateAllProducts(ApiData.data)
        }
        catch (error) {
            console.error('Error:', error);
            alert(error);
        }
    }

    useEffect(() => {
        fetchProductSummary();
    }, []);
    console.log(products);

    const Increment = async (id, qty) => {

        try {
            const response = await fetch(`${backendapi}/admin/product-quantity-update`, {
                method: 'POST',
                credentials: "include",
                headers:
                {

                    "Content-Type": "application/json"

                },
                body: JSON.stringify({
                    _id: id,
                    qty: qty + 1
                })
            });

            const ApiData = await response.json();

            if (ApiData.success) {
                fetchProductSummary();
                NumerProductsInCart();
            }

        }
        catch (error) {
            console.error('Error:', error);
            alert(error);
        }

    }
    const decrement = async (id, qty) => {
        if (qty >= 2) {
            try {
                const response = await fetch(`${backendapi}/admin/product-quantity-update`, {
                    method: 'POST',
                    credentials: "include",
                    headers:
                    {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        _id: id,
                        qty: qty - 1
                    })
                });

                const ApiData = await response.json();
                console.log(ApiData);
                if (ApiData.success) {
                    fetchProductSummary();
                    NumerProductsInCart();
                }

            }
            catch (error) {
                console.error('Error:', error);
                alert(error);
            }
        }

    }

    const removedCart = async (id) => {

        try {
            const response = await fetch(`${backendapi}/admin/product-deleted`, {
                method: 'POST',
                credentials: "include",
                headers:
                {

                    "Content-Type": "application/json"

                },
                body: JSON.stringify({
                    _id: id,

                })
            });

            const ApiData = await response.json();
            console.log(ApiData);
            if (ApiData.success) {
                fetchProductSummary();
                NumerProductsInCart();
            }

        }
        catch (error) {
            console.error('Error:', error);
            alert(error);
        }
    }
    const TotalCost = products.reduce((acc, cur) => {
        return acc += (cur.productId.selling * cur.quntity)
    }, 0)
    console.log(TotalCost);
    return (
        <>
            <div className="flex  flex-col overflow-y-scroll bg-white shadow-xl h-screen">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="container">
                        <div className="text-3xl font-bold text-gray-900">Shopping cart</div>

                    </div>
                    <div className=' container flex '>
                        <div className='col-7'>
                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {products.map((product) => (
                                            <li key={product.productId._id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        alt={product.imageAlt}
                                                        src={`${backendapi}/uploads/${product?.productId.category}/${product?.productId.productImg[0]}`}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={product.href}>{product.productId.productName
                                                                }</a>
                                                            </h3>
                                                            <p className="ml-4">&#8377;{product.productId.selling
                                                            }</p>
                                                        </div>
                                                        <div className='flex items-end justify-between mt-3'> <p className="mt-1 text-sm text-gray-500">{product.productId.brandName}</p>
                                                            {/* <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                Remove
                                                            </button>*/ }</div>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <div className="flex gap-3 items-center justify-between text-lg ">
                                                            <div onClick={() => decrement(product._id, product.quntity)}><FaMinus /></div>
                                                            <div><p className="text-gray-500">Qty {product.quntity}</p></div>
                                                            <div onClick={() => Increment(product._id, product.quntity)}><FaPlus /></div>
                                                        </div>
                                                        <div className="flex">
                                                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-800" onClick={() => removedCart(product._id)}>
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {numProductInCart > 0 ? (<div className=" col-5  px-4 py-6 sm:px-6 bg-gray-100 h-50 rounded-3xl">
                            <div className="flex justify-between text-xl font-bold text-gray-900">
                                <h2>Order summary </h2>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900 my-4  pb-3 border-b border-gray-200">
                                <div>Total Number Of Product</div>
                                <div> {numProductInCart}</div>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900 my-4  pb-3 border-b border-gray-200">
                                <p>Subtotal</p>
                                <p>&#8377;{TotalCost}</p>
                            </div>

                            <div className="mt-6">
                                <a
                                    href="#"
                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Checkout
                                </a>
                            </div>
                        </div>) : (<div className=" text-base font-medium text-gray-900 my-4  pb-3 border-b border-gray-200">
                            <p>No products in cart</p>

                        </div>)}
                    </div>

                </div>


            </div>
        </>
    )
}

export default Cart
