"use client";
import { BASE_URL } from "@/utils/Const";
import axios from "axios";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

interface propsType {
  input: string;
  setinput: Dispatch<SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent) => void;
}

const MobileNavBar = ({ input, setinput, handleSubmit }: propsType) => {
  const [isOpen, setisOpen] = useState(false);
  const [genres, setgenres] = useState([]);
  const [selectedGenre, setselectedGenre] = useState("");
  const searchParams = useSearchParams();
  const params = useParams();

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`
      )
      .then(({ data }) => {
        setgenres(data);
      })
      .catch((err) => {
        console.log("error in fetching genres", err);
      });
  }, []);

  useEffect(() => {
    if (searchParams.get("genre")) {
      setselectedGenre(searchParams.get("genre")!);
      return;
    }
    setselectedGenre(params.id.toString());
  }, [searchParams.get("genre"), params.id]);

  return (
    <>
      <form
        className=" md:hidden flex justify-between   w-[100%]"
        onSubmit={handleSubmit}
      >
        <div onClick={() => setisOpen(true)}>
          <AiOutlineMenu size={30} />
        </div>
        <div className="space-x-4 ">
          <input
            className="bg-secondary px-4 py-2 outline-none placeholder:text-textColour text-[14px] w-[180px]"
            type="text"
            aria-label="search"
            value={input}
            onChange={(e) => setinput(e.target.value)}
            placeholder="Search Movie.."
          />
          <button
            type="submit"
            className="bg-secondary text-textColour hover:text-white text-[14px]"
          >
            search
          </button>
        </div>
      </form>

      {/* side nav---------------- */}

      <div
        className={`min-h-[100vh] max-h-[100vh] w-[100%] bg-primary fixed left-0 top-0 z-20 overflow-scroll ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className=" sticky top-0 bg-primary py-4 w-[100%]">
          {" "}
          <IoMdClose className="absolute top-0 right-0 m-6" size={28} onClick={()=>setisOpen(false)} />
          <Link href={"/discover/nowplaying"}
          onClick={()=>setisOpen(false)}>
          <div className="sideBarTitle text-[28] text-center">
            MovieApp
          </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileNavBar;
