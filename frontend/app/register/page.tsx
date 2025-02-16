'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "@/styles/globals.css";

export default function Register () {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>(""); 
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setErrorMessage("");

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', 
        { username, email, password, confirmPassword }
      );
      if (response.status === 201) {
        router.push("/login");
      }
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || "Registration failed, please try again.");
    }
  };

  return (
    <section className="text-gray-400 bg-gray-900 body-font min-h-screen">
    <div className="container px-5 py-24 mx-auto flex justify-center items-center">
      
      <div className="lg:w-1/3 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
        <h2 className="text-white text-lg font-medium title-font mb-5 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="relative mb-4">
            <label htmlFor="full-name" className="leading-7 text-sm text-gray-400">
              Username
            </label>
            <input
              type="text"
              id="full-name"
              name="full-name"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 
                        rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 
                        py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 
                        rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 
                        py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 
                        rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 
                        py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-400">
              Confirm Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 
                        rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 
                        py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              required
            />
          </div>
          <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Sign Up
          </button>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </form>
        
        <p className="text-xs mt-3 text-center">If you have an account? pls <a href="/login" className="text-white underline">Login</a></p>
      </div>
    </div>
    </section>
  );
};
