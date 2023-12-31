import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
  const {user, setUser, token, setToken} = useStateContext();

  if (!token) {
    return <Navigate to="/login" />
  }

  const onLogout = (event) => {
    event.preventDefault()

    axiosClient.post('/logout')
      .then(() =>{
        setUser({})
        setToken(null)
      })
  }

  useEffect(()=>{
    axiosClient.get('/user')
      .then(({data}) =>{
        setUser(data)
      })
  },[])

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div><h2 style={{ color: "#5b08a7" }}>Shree Dwarkesh Electronics</h2></div>
            <div>
                Hello,&nbsp;{user.name} &nbsp; &nbsp;
                <a href="#" className="btn-logout" onClick={onLogout}>Logout</a>
            </div>
        </header>
        <main>
            <Outlet />
        </main>
      </div>
    </div>
  )
}