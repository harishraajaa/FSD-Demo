import Login from "../components/Login"
import { Navigate } from "react-router-dom"
import SignUp from "../components/SignUp"
import Home from '../components/Blogs/index'
import Users from "../components/users"
import Create from '../components/Blogs/Create'
import View from "../components/Blogs/View"
import AdminGuard from "./AdminGuard"
import ProtectedRoute from "./ProtectedRoute"
import Forgetpass from '../components/Forgetpass'
import PasswordReset from "../components/PasswordReset"
import ActivateUser from "../components/ActivateUser"


const AppRoutes = [
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/signup',
        element:<SignUp/>
    },
    {
        path:'/forgetpassword',
        element:<Forgetpass/>
    },
    {
        path:'/resetpassword/:id',
        element:<PasswordReset/>
    },
    {
        path:'/activateUser/:id',
        element:<ActivateUser/>
    },
    {
        path:'/home',
        element:<ProtectedRoute><Home/></ProtectedRoute>
    },
    {
        path:'/blog/create',
        element:<ProtectedRoute><Create/></ProtectedRoute>
    },
    {
        path:'/blogs',
        element:<ProtectedRoute><View/></ProtectedRoute>
    },
    {
        path:'/users',
        element:<ProtectedRoute><AdminGuard><Users/></AdminGuard></ProtectedRoute>
    },
    {
        path:'*',
        element:<Navigate to='/login'/>
    }
]
export default AppRoutes