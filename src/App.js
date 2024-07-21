import { Outlet } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Header from './components/Header';

import Footer from './components/Footer';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { setUserdetails } from "./reduxToolKit/Userslice";

import { mycontext } from './other/Context';
import { backendapi } from './helper/Data';



function App() {
  <ToastContainer />
  const dispatch = useDispatch();

  const [numProductInCart, setnumberProductInCart] = useState(0);

  async function getuserDetails() {
    try {
      const response = await fetch(`${backendapi}/user/userDetail`, {
        method: 'get',
        credentials: 'include'

      });

      const data = await response.json();


      if (data.success) {

        NumerProductsInCart();



        dispatch(setUserdetails(data))

      }
      else {
        console.log(data.message || "Something went wrong!");
      }

    } catch (error) {
      console.error('Error:', error);
      alert(error);
    }
  }

  const NumerProductsInCart = async () => {
    const response = await fetch(`${backendapi}/admin/number-product-cart`, {
      method: "get",
      credentials: "include"
    })
    const noProducts = await response.json();

    const result = await noProducts
    setnumberProductInCart(result?.data);
  }

  useEffect(() => {
    getuserDetails();
    NumerProductsInCart()

  }, []);

  return (
    <>
      <mycontext.Provider value={{ getuserDetails, numProductInCart, NumerProductsInCart }} >
        <div><Header /></div>
        <Outlet />
        <Footer />
        <ToastContainer />
      </mycontext.Provider>
    </>
  );
}

export default App;
