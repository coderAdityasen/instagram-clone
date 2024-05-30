import React from "react";
import {Link, useNavigate} from "react-router-dom"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { login } from "../redux/Actions/UserAchtion";

function Login() {
  const {register, handleSubmit } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onsubmit =async (data)=>{
    await dispatch(login(data.email, data.password))

     navigate("/home")
  }

  return (
    <div className="w-full flex justify-center items-center ">
      <div>
        <form onSubmit={handleSubmit(onsubmit)} className=" mt-16 border w-[23rem]">
          <div className="w-full">
            <img
              src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
              className="w-40 mx-auto"
              alt=""
            />
          </div>
          <div className="grid mx-10 gap-2 ">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              type="password"
              placeholder="Password"
              {...register("password")}
            />

            <button
              type="submit"
              className="bg-blue-500 text-white mx-auto rounded-md my-5 px-28 py-1"
            >
              Log in
            </button>
			<p className="text-center">OR</p>

			<p className="text-center text-sm my-5"><Link to="/forgot-password">forgot password ?</Link></p>
            <h1 className="text-center mb-10">
              Don't Have an account ?{" "}
              <span className="text-blue-500">
                <Link to="/signup">signup</Link>
              </span>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
