import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangeRole from './ChangeRole';
import { backendapi } from '../../helper/Data';

const Users = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        try {
            const fetchResponse = await fetch(`${backendapi}/user/getallusers`, {
                method: "get",
                credentials: "include"
            });
            const response = await fetchResponse.json();
            if (response.success) {
                setAllUsers(response.userData);
                //toast.success("Data fetched successfully");
            } else {
                toast.error(response.message || "Something went wrong!");
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.message);
        }
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
    };

    return (
        <>
            <ToastContainer />
            <div style={{ margin: '20px' }}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">userName</th>
                            <th scope="col">email</th>
                            <th scope="col">role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user) => (
                            <tr key={user._id}>
                                <th scope="row">{user._id}</th>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-toggle="modal"
                                        data-target="#exampleModalCenter"
                                        onClick={() => handleEditClick(user)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div
                className="modal fade"
                id="exampleModalCenter"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit User</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {selectedUser ? (
                                <ChangeRole user={selectedUser} />
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Users;
