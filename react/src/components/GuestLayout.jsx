import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

//it shows view a/c to selected route which is childern of this layout

export default function GuestLayout(){
    const {token} = useStateContext()

    if(token){
      return <Navigate to="/" /> 
    }

    return (
        <div>
            <Outlet />  
        </div>
    )
}