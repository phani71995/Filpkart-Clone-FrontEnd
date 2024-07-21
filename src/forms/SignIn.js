/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mycontext } from '../other/Context';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendapi } from '../helper/Data';

export default function SignIn() {
    const Navigate = useNavigate();
    const { getuserDetails, numProductInCart, NumerProductsInCart } = useContext(mycontext);


    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    });



    function onChangeHandler(e) {
        const { name, value } = e.target;

        setUserDetails(prevState => ({
            ...prevState,
            [name]: value
        }));

    }

    async function onSubmitHandler(e) {

        e.preventDefault();

        // Check if password and confirm password match


        try {
            console.log(userDetails);

            const response = await fetch(`${backendapi}/user/singin`, { // fixed the endpoint URL
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDetails)
            });

            const data = await response.json();
            console.log(data);

            if (data.success) {
                getuserDetails();
                Navigate("/")

                alert("Login successful");

                setUserDetails({

                    email: "",
                    password: "",

                });


            }
            else {
                alert(data.message || "Something went wrong!");
            }
            //

        } catch (error) {
            console.error('Error:', error);
            alert(error);
        }
    }







    return (
        <>
            {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}

            <ToastContainer />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://seeklogo.com/images/F/flipkart-logo-C9E637A758-seeklogo.com.png"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={(e) => { onSubmitHandler(e) }} >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={userDetails.email}
                                    onChange={(e) => {
                                        onChangeHandler(e)
                                    }}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <span href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={userDetails.password}
                                    onChange={(e) => {
                                        onChangeHandler(e)
                                    }}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-100"
                            >
                                Sign in
                            </button>

                            <div>
                                <button className=' btn btn-warning  mt-2 flex w-full justify-center px-3 py-1.5 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'><Link to="/signup">
                                    <span className="text-white" >SingUp</span>

                                </Link></button></div>
                        </div>


                    </form>


                </div>
            </div>
        </>
    )
}
