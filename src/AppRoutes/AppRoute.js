import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../Pages/Home/Home';
import DetailItem from '../Pages/Home/DetailItem';
import SignUp from '../forms/SignUp';
import SignIn from '../forms/SignIn';
import Admin from '../components/Admin/Admin';
import Orders from '../components/Admin/Orders';
import Products from '../components/Admin/Products';
import AddProduct from '../components/Admin/AddProduct';
import Users from '../components/Admin/Users';
import Dashboard from '../components/Admin/Dashboard';
import ChangeRole from '../components/Admin/ChangeRole';
import Mobiles from '../Pages/Mobiles';
import Cart from '../Pages/Cart/Cart';
import SearchBar from '../Pages/Home/SearchBar';
import BannerCategory from '../Pages/Home/BannerCategory';
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'signin',
                element: <SignIn />,
            },
            {
                path: 'signup',
                element: <SignUp />,
            },
            {
                path: '/admin',
                element: <Admin />,
                children: [
                    {
                        path: 'dashboard',
                        element: <Dashboard />

                    },
                    {
                        path: 'orders',
                        element: <Orders />

                    },
                    {
                        path: 'products',
                        element: <Products />

                    }, {
                        path: 'addProduct',
                        element: <AddProduct />

                    },
                    {
                        path: 'users',
                        element: <Users />,




                    }]
            },


            {
                path: '/bannercategory?',
                element: <BannerCategory />,
            },
            {
                path: '/detailitem/:productId/:category',
                element: <DetailItem />,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '/search',
                element: <SearchBar />,
            },

        ],
    },
]);

export default router;
