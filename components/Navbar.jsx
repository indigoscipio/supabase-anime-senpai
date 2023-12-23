import Link from "next/link";
import React from "react";
import SignOut from "./SignOut";

const Navbar = () => {
  return (
    <header className="bg-neutral-100">
      <nav className="p-4 flex justify-between">
        <Link href="/">
          <p className="text-2xl font-bold">AnimeSenpai 🐱</p>
        </Link>
        <div className="flex gap-4">
          <Link href="/profile">
            <button className="btn-primary">My Profile</button>
          </Link>
          <SignOut />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
