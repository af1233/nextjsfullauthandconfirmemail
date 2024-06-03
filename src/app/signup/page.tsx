"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUserName] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (username.length > 0 && email.length > 0 && password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [username, password, email]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(""); // Clear previous error messages
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", {
        username,
        email,
        password,
      });

      if (response.data) {
        toast.success(response.data.message || "User created successfully!");
        router.push("/login");
      }
    } catch (error: any) {
      console.log("Signup failed", error.response?.data?.message || error.message);
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
          <div>
            <label htmlFor="username" className="block font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
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
            disabled={buttonDisabled}
            className={`py-2 px-4 rounded-md text-white ${
              buttonDisabled ? "bg-red-500 hover:bg-red-600" : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            Sign Up
          </button>
          <p>
            Already have an account? <Link href={"/login"}>Login</Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignUpPage;
