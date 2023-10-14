//in this file we create the Users page view of the our site
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Users(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [totalPages, setTotalPages] = useState(1); // Track the total number of pages

    useEffect(()=>{
        getUsers()
    },[currentPage])

    const onDeleteClick = (user) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
          return
        }
        axiosClient.delete(`/users/${user.id}`)
          .then(() => {
            setNotification('User was successfully deleted')
            getUsers()
          })
      }

    const getUsers = () => {
        setLoading(true);
        axiosClient.get(`/users?page=${currentPage}`)
            .then(({ data }) => {
                setLoading(false);
                setUsers(data.data);
                setTotalPages(data.last_page);
            })
            .catch(() => {
                setLoading(false);
            });
    };
    

    return (
        <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h1>Users</h1>
                <Link to="/users/new" className="btn-add" >Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && 
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">Loading...</td>
                            </tr>
                        </tbody>
                    }
                    {!loading && 
                        <tbody>
                            {users.map(u=>(
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.created_at}</td>
                                    <td>
                                        <Link to={'/users/'+u.id} className="btn-edit">Edit</Link>
                                        &nbsp;
                                        {users && <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>} 
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>
                
                <div className="pagination-container">
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="pagination-button" >
                        Previous
                    </button>
                    &nbsp;
                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="pagination-button" >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}