import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
function Login() {
    const userNameRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    function handleClick(e) {
        e.preventDefault()
        const storeUserJSON = localStorage.getItem("token");
        const storedUser = JSON.parse(storeUserJSON);
         
  
      if (storeUserJSON) {
  
        const entereEmail = userNameRef.current.value;
        const enterePassword = passwordRef.current.value;
        console.log(entereEmail);
        console.log(enterePassword);
  
        const storeEmail = storedUser.userName;
        const storePassword = storedUser.password;
        console.log(storePassword);
        console.log(storeEmail);
  
        if (entereEmail === storeEmail && enterePassword === storePassword) {
          navigate("/");
        } else {
          alert("Email yoki password Notog'ri");
        }
      } 
  
  
        
        userNameRef.current.value = null
        passwordRef.current.value = null
    
    
      }


    return (
        <>
            <div className="w-3/5 mx-auto">
                <form className="mx-auto w-[300px] shadow-lg py-24 px-12 mt-24" onSubmit={handleClick}>
                    <h1 className="text-center text-3xl mt-4 mb-4">Login</h1>
                    <div className="flex flex-col gap-3 mt-4">
                        <label className="cursor-pointer" htmlFor="name">UserName <span className="text-[red]">*</span></label>
                        <input ref={userNameRef} type="text" placeholder="Enter UserName" className="input rounded-lg border-[1px] w-full py-2 px-4 w-full" id="name" />
                    </div>
                    <div className="flex flex-col gap-3 mt-4">
                        <label className="cursor-pointer" htmlFor="pass">Password <span className="text-[red]">*</span></label>
                        <input ref={passwordRef} type="password" placeholder="Enter Password" className="input rounded-lg border-[1px] w-full py-2 px-4 w-full" id="pass" />
                    </div>
                    <button className="btn bg-sky-500 w-full rounded-lg my-5 py-2 px-4 text-white">Login</button>
                    <Link className="mt-8 hover:underline transition duration-300 ease-in-out" to='/register'>Register</Link>
                </form>
            </div>
        </>
    )
}

export default Login
