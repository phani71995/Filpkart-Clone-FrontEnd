import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { backendapi } from '../../helper/Data';
const ChangeRole = ({ user }) => {
    const navigate = useNavigate();
    const [changedvalue, updatechangedvalue] = useState(user);

    useEffect(() => {
        updatechangedvalue(user);
    }, [user]);

    const role = {
        ADMIN: "ADMIN",
        GENERAL: "GENERAL"
    }
    const roleArray = Object.values(role);

    const userchangeHandler = (e) => {
        const { name, value } = e.target;
        updatechangedvalue(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const onsubmitHnadler = async (e) => {
        e.preventDefault();
        try {
            console.log(changedvalue);
            const fetchResponse = await fetch(`${backendapi}/user/updateuser`, {
                method: "post",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(changedvalue)
            });
            const response = await fetchResponse.json();
            if (response.success) {
                // Handle success response
                toast.success("Data fetched successfully");
                navigate('/admin/')
            } else {
                // Handle error response
                // toast.error(response.message || "Something went wrong!");
            }
        } catch (error) {
            console.error('Error:', error);
            // toast.error(error.message);
        }
    }

    return (
        <>
            <form onSubmit={onsubmitHnadler}>
                <div>
                    <div>UserName &nbsp;&nbsp;&nbsp;&nbsp; : <input type='text' name='userName' value={changedvalue.userName} onChange={userchangeHandler} /></div>
                    <div>Email &nbsp;&nbsp;&nbsp;&nbsp;: <input type='text' name='email' value={changedvalue.email} onChange={userchangeHandler} /></div>
                    <div>Role &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                        <select value={changedvalue.role} name='role' onChange={userchangeHandler}>
                            {roleArray.map((roleType, index) => (
                                <option key={index} value={roleType}>
                                    {roleType}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ChangeRole;
