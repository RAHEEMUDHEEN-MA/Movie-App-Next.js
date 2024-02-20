"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MobileNavBar from "./MobileNavBar";

const Navbar = () => {
  const [input, setinput] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setinput("");
    router.push(`/search/${input}?page=1`);
  };
  return (
    <div className="bg-primary">
      <div className="flex justify-between items-center py-4 px-2 md:px-10">
        <Link className="hidden md:block " href="/discover/now_playing">
          <h2 className="text-[30px] text-white">MovieApp</h2>
        </Link>

        <form className="space-x-4 hidden md:block" onSubmit={handleSubmit}>
          <input
            aria-label="search"
            className="bg-secondary px-4 py-2 outline-none placeholder:text-textColour"
            type="text"
            value={input}
            onChange={(e) => setinput(e.target.value)}
            placeholder="Search Movie"
          />
          <button className="bg-secondary text-textColour py-2 px-4 hover:bg-textColour hover:text-white">
            search
          </button>
        </form>


        <MobileNavBar input={input} setinput={setinput} handleSubmit={handleSubmit}/>
      </div>
    </div>
  );
};

export default Navbar;
