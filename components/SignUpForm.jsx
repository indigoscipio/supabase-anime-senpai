"use client";
import React, { useState } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const supabase = createClientComponentClient();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Basic password validation
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      const { data: authData, error: authDataError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (authDataError) {
        console.log(error);
        setErrorMsg(authDataError);
      }

      if (authData) {
        console.log(authData);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrorMsg("");
        setSuccessMsg(
          "A confirmation link has been sent to your email. Kindly check :) 👍"
        );
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-100">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Let's Sign Up, Onii-chan! 🍡
        </h1>
        <form onSubmit={handleSignUp}>
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

          <label className="block mb-4">
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Sign Up
          </button>

          <Link href="sign-in">
            <p className="text-center mt-4 underline text-blue-500">
              Already have an account? Sign In.
            </p>
          </Link>

          {errorMsg && (
            <p className="text-red-500 mt-2 text-center">{errorMsg}</p>
          )}

          {successMsg && (
            <p className="text-green-500 mt-2 text-center">{successMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
