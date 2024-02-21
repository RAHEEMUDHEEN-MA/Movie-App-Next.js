"use client";
import { BASE_URL } from "@/utils/Const";
import axios from "axios";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SideBar = () => {
  const [genres, setgenres] = useState([]);
  const [selectedGenre, setselectedGenre] = useState("");
  const params = useParams();
  const searchParams = useSearchParams();

  interface genreType {
    id: string;
    name: string;
  }

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      )
      .then(({ data }) => {
        setgenres(data.genres);
        // console.log("api data", data.genres);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   if (searchParams.get("genre")) {
  //     setselectedGenre(searchParams.get("genre")?.toString()!);
  //     return;
  //   }
  //   setselectedGenre(params.id.toString())

  // }, []);

  useEffect(() => {
    if (searchParams.get("genre")) {
      setselectedGenre(searchParams.get("genre")?.toString()!);
      return;
    }
    setselectedGenre(params.id.toString());
  }, [params.id]);

  return (
    <div
      className=" bg-slate-950 px-10 max-h-[calc(100vh-77px)] pb-6 overflow-y-scroll 
    scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-primary hidden sm:block "
    >
      <div className="flex flex-col gap-4 pt-4">
        <p className="sideBarTitle">Discover</p>

        <Link className="w-fit" href={"/discover/now_playing"}>
          <p
            className={`sideBarLink  ${
              selectedGenre === "now_playing" ? "sideBarActive" : ""
            }`}
          >
            Now Playing
          </p>
        </Link>

        <Link className="w-fit" href={"/discover/top_rated"}>
          <p
            className={`sideBarLink  ${
              selectedGenre === "top_rated" ? "sideBarActive" : ""
            }`}
          >
            Top Rated
          </p>
        </Link>

        <Link className="w-fit" href={"/discover/popular"}>
          <p
            className={`sideBarLink  ${
              selectedGenre === "popular" ? "sideBarActive" : ""
            }`}
          >
            Popular
          </p>
        </Link>

        <Link className="w-fit" href={"/discover/upcoming"}>
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
          >
            <p
              className={`sideBarLink  ${
                selectedGenre === data.name.toLocaleLowerCase()
                  ? "sideBarActive"
                  : ""
              }`}
            >
              {data.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
