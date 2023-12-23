"use client";
import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    }

    if (data) {
      // handle success
    }

    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Welcome to Anime Senpai v0.1! 🐱
        </h2>
        <p className="mb-3 text-gray-500 text-center">By indigiscipio</p>
        <form onSubmit={handleSignIn}>
          <label className="block mb-4">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>

          <label className="block mb-4">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Sign In
          </button>

          <Link href="sign-up">
            <p className="text-center mt-4 underline text-blue-500">
              Don't have an account? Sign Up
            </p>
          </Link>
        </form>

        {errorMsg && (
          <p className="text-red-500 text-center mt-4">ERROR: {errorMsg}</p>
        )}
      </div>
    </div>
  );
};

export default SignInForm;
