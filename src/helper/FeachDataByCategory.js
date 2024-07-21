import React from 'react'
import { backendapi } from "./Data"
const FeachDataByCategory = async (category) => {

    try {
        const response = await fetch(`${backendapi}/admin/productgetbycategory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ category: category })


        });
        const data = await response.json()

        return data
    }
    catch (error) {
        console.log(error);
    }
}

export default FeachDataByCategory
