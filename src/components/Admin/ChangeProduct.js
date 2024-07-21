import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


import axios from 'axios';

import { IoMdCloudUpload } from "react-icons/io";


import DisplayImage from "./DisplayImage";
import productCategory from "../../helper/ProductCategory";
import { MdDelete } from "react-icons/md";
import { backendapi } from '../../helper/Data';

const ChangeProduct = ({ productData }) => {
    const navigate = useNavigate();
    const [selectedImg, setSelectedImg] = useState([]);
    const [data, setData] = useState({});


    useEffect(() => {
        setData({ ...productData });
        setSelectedImg([...productData.productImg])
    }, [productData])
    console.log(data)
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };



    const deletedImag = (imgindex) => {
        const filteredImages = selectedImg.filter((_, index) => imgindex !== index);
        setData((prev) => ({
            ...prev,
            productImg: filteredImages
        }));
        setSelectedImg(filteredImages);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const updatedImages = [...data.productImg, ...files];

        setData((prev) => ({ ...prev, productImg: updatedImages }));

        const fileReaders = files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = () => reject(new Error("Failed to read file"));
                reader.readAsDataURL(file);
            });
        });

        Promise.all(fileReaders)
            .then(images => {
                setSelectedImg(prevImages => [...prevImages, ...images]);
            })
            .catch(error => {
                console.error('Error reading files:', error);
            });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productId', data._id);
        formData.append('productName', data.productName);
        formData.append('brandName', data.brandName);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('selling', data.selling);
        formData.append('category', data.category);

        data.productImg.forEach((img) => {
            formData.append('productImg', img);
        });

        try {
            const response = await fetch(`${backendapi}/admin/changeproduct`, {
                method: 'POST',
                credentials: "include",
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                toast.success("Data added successfully");
                navigate("/admin");
            } else {
                toast.error(result.message || "Something went wrong!");
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message);
        }
    };


    return (
        <><div className="changeProduct">
            <div class="modal fade " id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header ">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <form onSubmit={onSubmitHandler} encType="multipart/form-data">
                            <div className='container '>
                                <div>
                                    <label htmlFor="productName">Product Id</label>
                                    <input
                                        type="text"
                                        className="form-control"

                                        value={data._id}
                                        name='id'

                                    />
                                </div>
                                <div>
                                    <label htmlFor="productName">Product Name</label>
                                    <input
                                        type="text"
                                        className="form-control"

                                        value={data.productName}
                                        name='productName'
                                        onChange={onChangeHandler}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="brandName">Brand Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Brand Name"
                                        value={data.brandName}
                                        name='brandName'
                                        onChange={onChangeHandler}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="category" className='mr-5 mt-2'>Category</label>
                                    <select
                                        className='p-1 ml-5 mt-2'
                                        value={data.category}
                                        name='category'
                                        onChange={onChangeHandler}
                                    >
                                        <option value='category'>select</option>
                                        {productCategory.map((product) => (
                                            <option key={product.value} value={product.value}>{product.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Description"
                                        value={data.description}
                                        name='description'
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Price"
                                        value={data.price}
                                        name='price'
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="selling">Selling</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Selling"
                                        value={data.selling}
                                        name='selling'
                                        onChange={onChangeHandler}
                                        required
                                    />
                                </div>
                                <div className="mx-auto w-auto">
                                    <div className='upload'>
                                        <center>
                                            <IoMdCloudUpload style={{ fontSize: '40px', textAlign: 'center' }} />  Upload Image
                                            <input
                                                type="file"
                                                onChange={handleImageChange}
                                                name='productImg'
                                                style={{ width: '800px', opacity: 0, cursor: 'pointer' }}
                                                multiple
                                            />
                                        </center>
                                    </div>
                                    <center>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            {selectedImg && selectedImg.map((img, index) => (
                                                <div key={index} className='addImage'>
                                                    <img
                                                        src={`${backendapi}/uploads/${data?.category}/${img}`}

                                                        alt="Uploaded"
                                                        style={{ width: '100px', height: '100px', margin: '10px', verticalAlign: 'middle' }}

                                                    />
                                                    <div className='addButton'>
                                                        <button type="button" onClick={() => deletedImag(index)}>
                                                            <MdDelete style={{ fontSize: '25px', backgroundColor: "green" }} />
                                                        </button>

                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </center>
                                </div>
                                <center>

                                    <button type="button" className="btn btn-secondary " data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary ">Submit</button>
                                </center>
                            </div>
                        </form>
                        <ToastContainer />





                    </div>
                </div>
            </div>

        </div>
        </>
    )
}

export default ChangeProduct
