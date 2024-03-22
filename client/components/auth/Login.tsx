"use client";
import Link from "next/link";
import React, { useState } from "react";
import { handleLogin, getId } from "./AuthController";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
function Login() {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const spinner = <FaSpinner className="fa-spin spin " />;
  const router = useRouter();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoader(true);
    try {
      const loginPayload = await handleLogin(email.toLowerCase(), password);
      if (loginPayload.success) {
        Swal.fire({
          title: "Success!",
          text: loginPayload.message,
          icon: "success"
        });
        Cookies.set("token", JSON.stringify(loginPayload.token));
        const { id } = await getId(loginPayload.token);
        id ? router.push(`/rooms`) : router.push("/auth/login");
      } else {
        Swal.fire({
          title: "Oops!",
          text: loginPayload.message,
          icon: "error"
        });
      }
    } catch (error) {
      console.error(error);
    }
    setLoader(false);
  };
  return (
    <div className="relative min-h-screen px-5 md:px-20">
      <div className="flex [&>*]:self-center md:py-10 py-6 justify-between gap-10">
        <h1 className="font-semibold md:text-2xl text-xl">Hotel Site</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white mx-auto w-full md:w-8/12 p-4 md:p-10 py-6 md:py-10 rounded-lg my-10 md:my-5"
      >
        <h3 className="font-semibold inline-block md:text-2xl text-xl border-b-4 border-blue-500">
          Login
        </h3>
        <div className="flex flex-col gap-5 md:pt-10 pt-5">
          <div className="flex flex-col">
            <label>
              Email<span className="text-red-500">&nbsp;*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-b-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label>
              Password<span className="text-red-500">&nbsp;*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-b-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="self-center bg-blue-500 cursor-pointer text-white rounded-sm py-2 px-8"
          >
            {loader ? spinner : "Login"}
          </button>
        </div>
        <p className="pt-6">
          Don&apos;t have an account?
          <Link href="/auth/register" className="font-semibold text-blue-500">
            &nbsp;Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
