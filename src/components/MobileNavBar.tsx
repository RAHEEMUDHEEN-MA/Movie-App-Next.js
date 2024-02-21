"use client";
import { BASE_URL } from "@/utils/Const";
import axios from "axios";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

interface propsType {
  input: string;
  setinput: Dispatch<SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent) => void;
}

interface genreType {
  id: number;
  name: string;
}

const MobileNavBar = ({ input, setinput, handleSubmit }: propsType) => {
  const [isOpen, setisOpen] = useState(false);
  const [genres, setgenres] = useState([]);
  
  const [selectedGenre, setselectedGenre] = useState("");
  const searchParams = useSearchParams();
  const params = useParams();
  console.log("params:",params)
  // console.log("api key", process.env.NEXT_PUBLIC_API_KEY);
  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      )
      .then(({ data }) => {
        
        setgenres(data.genres);
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
    setselectedGenre(params.id?.toString());
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
          <IoMdClose
            className="absolute top-0 right-0 m-6"
            size={28}
            onClick={() => setisOpen(false)}
          />
          <Link href={"/discover/now-playing"} onClick={() => setisOpen(false)}>
            <div className="sideBarTitle text-[28] text-center">MovieApp</div>
          </Link>
        </div>

        <div className="px-4 pb-16 ">
          <div className="flex flex-col gap-4 pt-4">
            <p className="sideBarTitle">Discover</p>
            <Link
              className="w-fit"
              href={"/discover/now_playing"}
              onClick={() => setisOpen(false)}
            >
              <p
                className={`sideBarLink  ${
                  selectedGenre === "now_playing" ? "sideBarActive" : ""
                }`}
              >
                Now Playing
              </p>
            </Link>

            <Link
              className="w-fit"
              href={"/discover/top_rated"}
              onClick={() => setisOpen(false)}
            >
              <p
                className={`sideBarLink  ${
                  selectedGenre === "top_rated" ? "sideBarActive" : ""
                }`}
              >
                Top Rated
              </p>
            </Link>

            <Link
              className="w-fit"
              href={"/discover/popular"}
              onClick={() => setisOpen(false)}
            >
              <p
                className={`sideBarLink  ${
                  selectedGenre === "popular" ? "sideBarActive" : ""
                }`}
              >
                Popular
              </p>
            </Link>

            <Link
              className="w-fit"
              href={"/discover/upcoming"}
              onClick={() => setisOpen(false)}
            >
              <p
                className={`sideBarLink  ${
                  selectedGenre === "upcoming" ? "sideBarActive" : ""
                }`}
              >
                Upcoming
              </p>
            </Link>


            <p className="sideBarTitle">Genres</p>

            {genres.map((data: genreType) => (
              <Link
                key={data.id}
                className="w-fit"
                href={`/genres/${data.id}?genre=${data.name.toLocaleLowerCase()}`}
                onClick={() => setisOpen(false)}
              >
                <p
                  className={`sideBarLink  ${
                    selectedGenre === data.name.toLocaleLowerCase() ? "sideBarActive" : ""
                  }`}
                >
                  {data.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavBar;
