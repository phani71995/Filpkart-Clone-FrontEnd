import React from 'react'
import { IoMdClose } from "react-icons/io";
const DisplayImage = ({ img, method }) => {
    console.log("pic", img)
    return (
        <> <div className='displayEachImage'>


            <img src={img} alt="Uploaded" />
            <div className='closeIcon'>
                <button onClick={method}><IoMdClose /></button>
            </div>
            display
        </div>
        </>
    )
}

export default DisplayImage
