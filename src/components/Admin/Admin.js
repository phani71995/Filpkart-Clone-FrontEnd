import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Dashboard from './Dashboard'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
const Admin = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    console.log(user?.role)
    useEffect(() => {
        if (user?.role !== "ADMIN") {
            (navigate('/'))
        }

    }, [user, navigate])

    return (<>

        <div className='admin'>
            <div className='sideBar'>
                <div className="card ca">
                    <div className="card-header">

                    </div>
                </div>
                <ul>
                    <Link to="dashboard">  <li>Dashboard</li></Link>
                    <Link to="orders"> <li>Orders</li></Link>
                    <Link to="products">  <li>Products</li></Link>
                    <Link to="addProduct">  <li>AddProduct</li></Link>
                    <Link to="users"> <li>Users</li></Link>

                </ul>


            </div>
            <div className='mainsection'>


                <Outlet></Outlet>
            </div>

        </div ></>)
}

export default Admin
