import React from 'react'
import { backendapi } from "./Data";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddToCart = async (id) => {
    try {
        const response = await fetch(`${backendapi}/admin/addtocart`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ productId: id })
            }


        );
        const data = await response.json()

        return data
    }
    catch (error) {
        console.log(error);
    }
}

export default AddToCart
