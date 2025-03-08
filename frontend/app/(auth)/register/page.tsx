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
    <section className="text-gray-100 bg-gray-900 body-font min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg bg-gray-800 bg-opacity-75 rounded-lg p-6 sm:p-8 shadow-lg">
        <h2 className="text-white text-xl font-semibold text-center mb-5">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="relative mb-4">
            <label htmlFor="full-name" className="block text-sm text-gray-300 mb-1">
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
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
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
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
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
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
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
          <button className="text-gray-900 bg-[#FEC81A] border-0 py-2 px-8 focus:outline-none hover:bg-yellow-500 rounded text-lg font-semibold transition duration-300">
            Sign Up
          </button>
          {errorMessage && <div className="text-[#E73D1D] text-sm mt-3">{errorMessage}</div>}
        </form>
        <p className="text-xs mt-3 text-center text-gray-300">Already have an account? <a href="/login" className="text-[#FEC81A] underline">Log in</a></p>
      </div>
    </section>
  );
};
