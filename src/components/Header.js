
import { Fragment, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { IoPersonCircleSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
import { backendapi } from "../helper/Data"
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react'
import axios from 'axios';
import { resetState } from '../reduxToolKit/Userslice';
import { mycontext } from '../other/Context';



const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { getuserDetails, numProductInCart, NumerProductsInCart } = useContext(mycontext);

    const [logOut, showLogOut] = useState(true)
    const user = useSelector((state) => state.user.user);
    const [searchInput, setSearchInput] = useState()

    // console.log("searchInput", searchInput);
    // console.log("user", user?.profilePic);
    async function handleLogout() {


        try {
            const response = await fetch(`${backendapi}/user/signout`, { // fixed the endpoint URL
                method: 'POST',
                credentials: "include",
            });

            const data = await response.json();
            console.log(data.message);

            if (data.success) {
                toast.success(data.message);
                dispatch(resetState());

            }



            navigate("/signin");
        }
        catch (error) {
            console.error('Error:', error);
            alert(error);
        }
    }

    return (
        <Disclosure as="nav" className="bg-white headersection">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </DisclosureButton>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start ">
                                <div className="flex flex-shrink-0 items-center ">
                                    <Link to="/"><img
                                        className="h-10 w-auto"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcIX8HGp0yGjWL5VFEcuva-TbEZnlPIdTVaw&s"
                                        alt="Your Company"
                                    /></Link>
                                </div>
                                <div className='searchbar'>
                                    <input class=" form-control w-50 ml-5 " type="search" placeholder="Search" aria-label="Search" value={searchInput} name='search' onChange={(e) => setSearchInput(e.target.value)} />
                                    <div className='Serchicon'><Link onClick={() => setSearchInput("")} to={`/search?q=${searchInput}`} > <CiSearch /></Link></div>
                                </div>

                            </div>
                            <div className="flex mr-5 ">
                                {/* <span className="text-white pr-5 " >{user ? user?.userName : (<span>Name</span>)}</span>*/}


                                {/* Profile dropdown */}
                                <Menu as="div" className=" pr-5 ">
                                    <div className='flex'>
                                        <MenuButton className="relative flex justify-center items-center rounded-full bg-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-5 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>

                                            {
                                                (user?.profilePic) ? (<img
                                                    className="h-10 w-10 rounded-full"

                                                    src={`${backendapi}/uploads/${user?.profilePic}`}
                                                    alt=""
                                                />) : (<img
                                                    className="h-10 w-10 rounded-full"

                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9t5j9L4i32H5HrETHdg_WjD2ttC1ALt0l5w&s"
                                                    alt=""
                                                />
                                                )

                                            }
                                            < FaAngleDown />
                                        </MenuButton>
                                        <MenuButton className="relative flex rounded-full bg-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-white  ml-4 focus:ring-offset-5 focus:ring-offset-gray-800">
                                            {
                                                user?._id ? (
                                                    <button className=' btn ' onClick={handleLogout}>
                                                        <span className="text-white " style={{ textdecoration: "none" }} >SignOut</span>
                                                    </button>) : (<button className=' btn '>
                                                        <Link to="/signin" >
                                                            <span className="text-white " style={{ textdecoration: "none" }} >LogIn</span>

                                                        </Link></button>)
                                            }
                                        </MenuButton>
                                    </div>
                                    <Transition
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <MenuItem>
                                                {({ focus }) => (
                                                    <span
                                                        href="#"
                                                        className={classNames(focus ? 'bg-gray-100' : '', 'block px-2 py-2 text-sm text-gray-700')}
                                                    >
                                                        New Customer? <span className=' '>
                                                            <Link to="/signup" >
                                                                <span className="text-green font-bold" style={{ textdecoration: "none" }} >Sign Up</span>

                                                            </Link></span>
                                                    </span>
                                                )}
                                            </MenuItem>
                                            <MenuItem>
                                                {({ focus }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Profile
                                                    </a>
                                                )}
                                            </MenuItem>
                                            <MenuItem>
                                                {({ focus }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Settings
                                                    </a>
                                                )}
                                            </MenuItem>
                                            {(user?.role == "ADMIN") ? (<MenuItem>
                                                {({ focus }) => (
                                                    <Link to="/admin">
                                                        <span className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                            ADMIN
                                                        </span>

                                                    </Link>
                                                )}
                                            </MenuItem>) : (<MenuItem>
                                                {({ focus }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >

                                                    </a>
                                                )}
                                            </MenuItem>)}
                                        </MenuItems>
                                    </Transition>
                                </Menu>





                                {user ? (<Link
                                    to={"/cart"}
                                    className="relative   flex p-1 text-green-400 focus:outline-none "

                                >
                                    <div ><span className="absolute" />
                                        <span className="sr-only">View notifications</span>
                                        <IoCartOutline className="h-6 w-6" aria-hidden="true" /></div>
                                    <div> <span className='text-lg'>Cart<span style={{ color: "red" }}>({numProductInCart})</span></span></div>
                                </Link>) : (<button
                                    to={"/cart"}
                                    className="relative   flex p-1 text-green-400 focus:outline-none "
                                    onClick={() => toast.error("Please LogIn")}
                                >
                                    <div ><span className="absolute" />
                                        <span className="sr-only">View notifications</span>
                                        <IoCartOutline className="h-6 w-6" aria-hidden="true" /></div>
                                    <div> <span className='text-lg'>Cart<span style={{ color: "red" }}>{user ? (({ numProductInCart })) : ((0))}</span></span></div>
                                </button>)
                                }



                            </div>
                        </div>
                    </div>


                </>
            )
            }
        </Disclosure >
    )
}
