"use client";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import LoadingPage from "@/components/LoadingPage";
import { BASE_URL } from "@/utils/Const";
import axios from "axios";

import { useParams, useSearchParams, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

export interface MovieType {
  id: string;
  poster_path: string;
  title: string;
  release_date: string;
}
const Discover = () => {
  const [title, settitle] = useState("");
  const [movies, setmovies] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPage, settotalPage] = useState(1);
  const [discover, setdiscover] = useState("");

  const HomePageRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    HomePageRef?.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    const id = params.id.toString();
    console.log("id :",id)
    const page = searchParams.get("page");

    setdiscover(id);
    switch (id) {
      case "now_playing":
        settitle(" Now playing Movies");
        break;
      case "top_rated":
        settitle("Top Rated Movies");
        break;
      case "popular":
        settitle(" Popular Movies");
        break;
      case "upcoming":
        settitle(" Upcoming Movies");
        break;

      default:
        settitle("");
        break;
    }

    axios
      .get(`${BASE_URL}/movie/${id}`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          page,
        },
      })
      .then((response) => {
        console.log("discover wise response :", response.data.results);

        setmovies(response.data.results);
        setcurrentPage(response.data.page);
        settotalPage(response.data.total_page);
      })
      .catch((err) => console.log(err));
  }, [params.id, searchParams.get("page")]);

  const PageNavigation = (button: string) => {
    let page = "";
    if (button === "prev") {
      page = `page=${currentPage - 1}`;
    } else {
      page = `page=${currentPage + 1}`;
    }
    router.push(`/discover/${discover}?${page}`);
  };

  return (
    <main
      className="bg-primary max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] p-8
   overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-primary relative"
      ref={HomePageRef}
    >
      <h2 className="text-[24px] tracking-[2px]">{title}</h2>
      {movies.length === 0 && <LoadingPage />}

      <div className="moviesGrid grid gap-8 place-items-center mt-8">
        {movies.map((data: MovieType) => (
          <Card
            key={data.id}
            MoviePosterIMG={data.poster_path}
            MovieID={data.id}
            MovieTitle={data.title}
            releaseDate={data.release_date}
          />
        ))}
      </div>

      {/* butons -------------*/}
      <div className="flex justify-center gap-16 py-6 pt-16">
        <button
          onClick={() => {
            PageNavigation("prev");
          }}
          className={`bg-purple-800 p-2 px-8 hover:bg-purple-900 ${
            currentPage === 1 && "hidden"
          }`}
        >
          Back
        </button>

        <button
          onClick={() => {
            PageNavigation("next");
          }}
          className={`bg-purple-800 p-2 px-8 hover:bg-purple-900 ${
            currentPage === totalPage && "hidden"
          }`}
        >
          Next
        </button>
       
      </div>
      <Footer/>
    </main>
  );
};

export default Discover;
