"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";

const SignOut = () => {
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    const { data, error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  };

  return (
    <button className="btn-danger" onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOut;
