//in this file we create the Users page view of the our site
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Users(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getUsers()
    },[])

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({data})=>{
                setLoading(false)
                console.log(data);
            }).catch(()=>{
                setLoading(false);
            })
    }

    return (
        <div>
            <Link>User</Link>
        </div>
    )
}