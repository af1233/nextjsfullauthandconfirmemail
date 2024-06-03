"use client";

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(""); // Clear previous error messages
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });
        router.push("/profile");
        toast.success(response.data.message || "Logged in successfully!");
 
    } catch (error: any) {
      console.log("Login failed", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-dvh">
      {loading ? (
        <button type="button" className="bg-indigo-500 ..." disabled>
          <svg
            className="animate-spin h-5 w-5 mr-3 ..."
            viewBox="0 0 24 24"
          ></svg>
          Processing...
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 w-full sm:w-[400px]">
          <h2 className="text-center font-semibold text-2xl">Login</h2>
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
          >
            Log In
          </button>
 
          <p>
            Don't have an account? <Link href={"/signup"}>Sign Up</Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
