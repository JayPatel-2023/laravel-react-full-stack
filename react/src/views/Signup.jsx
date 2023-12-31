//in this file we create the Signup page view of the our site
import { Link } from "react-router-dom";
import {createRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";


export default function SignUp(){

    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef =createRef();
    const passwordConfirmationRef = createRef();
    const [errors,setErrors] = useState(null);
    const {setUser, setToken} = useStateContext()
    
    const onSubmit = (event) =>{
        event.preventDefault()
        const payload = {
            name : nameRef.current.value,
            email : emailRef.current.value,
            password : passwordRef.current.value,
            password_confirmation : passwordConfirmationRef.current.value,
        }
        console.log(payload);
        axiosClient.post('/signup', payload)
        .then(({data}) => {
            setUser(data.user)
            setToken(data.token);
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                console.log(response.data.errors)
                setErrors(response.data.errors);
            }
        })
    }

    return (
        < div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Signup for free</h1>
                    {errors &&
                        <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={nameRef} placeholder="Full Name" />
                    <input ref={emailRef} type="email" placeholder="Email Address" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" />
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Already Registered? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

//event.preventDefault() - means every time when submit button press the all fields will be empty and show like default page
//using payload we will collect the information from all field and make one object
//axiosClient.post() - use to send that created object to signup endpoint