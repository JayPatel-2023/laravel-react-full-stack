import {Navigate, createBrowserRouter} from "react-router-dom";
import Login from "./views/login";
import SignUp from "./views/Signup";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import UsersForm from "./views/UserForm";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";

//here we create the routes for the each page 
//path = the url of the browser
//element  = which react component we want to show to the user
//all routes must be inside the routes[] , and each seprated by comma with unique path names

const router = createBrowserRouter([
  {
    path:'/',
    element: <DefaultLayout />,
    children: [
        {
            path: '/',
            element: <Navigate to="/users" />
        },
        {
            path:'/dashboard',
            element: <Dashboard />
        },
        {
            path:'/users',
            element: <Users />
        },
        {
          path:'/users/new',
          element: <UsersForm key="userCreate" />
        },
        {
          path:'/users/:id',
          element: <UsersForm key="userUpdate"/>
      },
    ]
  },
  {
    path:'/',
    element: <GuestLayout />,
    children: [
        {
            path:'/login',
            element: <Login />
        },
        {
            path:'/signup',
            element: <SignUp />
        },
    ]
  },
  
  
  {
    path:'*',
    element: <NotFound />
  },
 
])

export default router;