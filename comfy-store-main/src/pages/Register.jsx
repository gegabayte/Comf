import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
function Register() {
    const navigate = useNavigate();
    const userNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const validate = () => {
        if (!userNameRef.current.value) {
            alert('username is not empty');
            userNameRef.current.focus();
            return false
        }
        if (!emailRef.current.value) {
            alert('email is not empty');
            emailRef.current.focus();
            return false
        }
        if (!passwordRef.current.value) {
            alert('password is not empty');
            passwordRef.current.focus();
            return false
        }
        return true
    }
    function getData() {
        let users = [];
        if (localStorage.getItem("users")) {
          users = localStorage.getItem("users");
        }
        return users;
    }
    function handleClick (e) {
        e.preventDefault();
        let isValid = validate();
  
        if (isValid) {
            let user = {
                userName: userNameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }
            let users = getData();
            users.push(user);
            localStorage.setItem('users' , JSON.stringify(users));

            localStorage.setItem("token", JSON.stringify(user));

            navigate('/login')
            userNameRef.current.value = null
            emailRef.current.value = null
            passwordRef.current.value = null
            
        }
        
    }
    return (
        <>
            <div className="w-3/5 mx-auto">
            <form className="mx-auto w-[300px] shadow-lg py-24 px-12 mt-12" onSubmit={handleClick}>
                <h1 className="text-center text-3xl mt-4 mb-4">Register</h1>
                <div className="flex flex-col gap-3 mt-4">
                    <label className="cursor-pointer" htmlFor="name">UserName <span className="text-[red]">*</span></label>
                    <input ref={userNameRef} type="text" placeholder="Enter UserName" className="input rounded-lg border-[1px] w-full py-2 px-4 w-full" id="name" />
                </div>
                <div className="flex flex-col gap-3 mt-4">
                    <label className="cursor-pointer" htmlFor="email">Email <span className="text-[red]">*</span></label>
                    <input ref={emailRef} type="email" placeholder="Enter Emial" className="input rounded-lg border-[1px] w-full py-2 px-4 w-full" id="email" />
                </div>
                <div className="flex flex-col gap-3 mt-4">
                    <label className="cursor-pointer" htmlFor="pass">Password <span className="text-[red]">*</span></label>
                    <input ref={passwordRef} type="password" placeholder="Enter Password" className="input rounded-lg border-[1px] w-full py-2 px-4 w-full" id="pass" />
                </div>
                <button className="btn bg-sky-500 w-full rounded-lg my-5 py-2 px-4 text-white">Register</button>
                <Link className="mt-8 hover:underline transition duration-300 ease-in-out" to='/login'>Login</Link>
            </form>
            </div>
        </>
    )
}

export default Register
