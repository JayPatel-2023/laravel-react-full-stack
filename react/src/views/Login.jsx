//in this file we create the Login page view of the our site
import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {createRef} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import { useState } from "react";

export default function Login(){
    const emailRef = createRef()
    const passwordRef = createRef()
    const { setUser, setToken } = useStateContext()
    const [errors,setErrors] = useState(null);

    const onSubmit = (event) =>{
        event.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }  
        console.log(payload);
        
        setErrors(null)
        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    if(response.data.errors){
                        setErrors(response.data.errors);
                    }else{
                        setErrors({
                            email : [response.data.message]
                        })
                    }
                    //console.log(response.data.errors) 
                }
            })
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
            <form onSubmit={onSubmit}>
                <h1 className="title">Login into your account</h1>
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                <input ref={emailRef} type="email" placeholder="Email"/>
                <input ref={passwordRef} type="password" placeholder="Password"/>
                <button className="btn btn-block">Login</button>
                <p className="message">
                    Not Registered? <Link to="/signup">Create an account</Link>
                </p>
            </form>
            </div>
        </div> 
    )
}