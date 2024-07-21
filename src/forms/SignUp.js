import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsPersonFillUp } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import { backendapi } from '../helper/Data';
const SignUp = () => {
    const navigate = useNavigate();
    const [selectedImg, setselectedImg] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [data, setData] = useState({
        userName: "",
        email: "",
        password: "",
        cpassword: "",
        profilePic: "",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prv) => ({
            ...prv,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setData({ ...data, profilePic: file })
        //setProfilePic(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setselectedImg(reader.result);
        };
        reader.readAsDataURL(file);
    };
    console.log(data.profilePic)
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (data.password !== data.cpassword) {
            alert("Passwords do not match!");
            return;
        }

        const formData = new FormData();
        formData.append('userName', data.userName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('profilePic', data.profilePic,);
        formData.append('imgname', data.profilePic.name);


        try {
            const response = await axios.post(`${backendapi}/user/signup`, formData);

            if (response.data.success) {
                toast.success("Data added successfully");
                navigate("/")
            } else {
                alert(response.data.message || "Something went wrong!");
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    return (
        <>
            <form onSubmit={onSubmitHandler} enctype="multipart/form-data">
                <div className="mx-auto  w-auto ">

                    {selectedImg ? (
                        <center>
                            <img src={selectedImg} alt="Uploaded" style={{ Width: '80px', height: '80px', borderRadius: '80%', verticalAlign: "middle" }} />
                        </center>
                    ) : (
                        <center>
                            <BsPersonFillUp style={{ fontSize: '60px', textAlign: 'center' }} /> Upload Image
                            <input
                                input type="file" onChange={handleImageChange}
                                name='profilePic'
                                style={{ position: 'absolute', top: "10px", left: '200px', width: '800px', height: '100px', opacity: 0, cursor: 'pointer' }}
                            />
                        </center>
                    )}

                </div >
                <div className='container w-50'>
                    <div className="form-group">
                        <label htmlFor="userName">User Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="User Name"
                            value={data.userName}
                            name='userName'
                            //onChange={(e) => setUserName(e.target.value)}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            autoComplete="email"
                            value={data.email}
                            name='email'
                            //onChange={(e) => setEmail(e.target.value)}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={data.password}
                            name='password'
                            // onChange={(e) => setPassword(e.target.value)}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpassword">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={data.cpassword}
                            name='cpassword'
                            //onChange={(e) => setCPassword(e.target.value)}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="profilePic">Profile Picture</label>
                        <input type="file" onChange={handleImageChange} />
                    </div> */}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            );


        </>
    )
}

export default SignUp
