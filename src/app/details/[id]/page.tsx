"use client";
import Footer from "@/components/Footer";
import { BASE_IMG_URL, BASE_URL } from "@/utils/Const";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Deatails = () => {
  interface video {
    id: string;
    type: string;
    key: string;
  }
  interface movie {
    id: string;
    type: string;
    key: string;
    poster_path: string;
    title: string;
    overview:string
  }

  const [movieDetails, setmovieDetails] = useState<movie>();
  console.log("movie data:", movieDetails);
  const [trailer, setTrailer] = useState<video>();
  console.log("trailer data:", trailer);

  const params = useParams();
  const id = params.id;
  console.log(params.id);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${id}`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
        },
      })
      .then((response) => {
        setmovieDetails(response.data);
        console.log("response data:", response);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });

    axios
      .get(`${BASE_URL}/movie/${id}/videos`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
        },
      })
      .then((res) => {
        const theTrailer = res.data.results.find(
          (video: video) => video.type === "Trailer"
        );
        console.log("the trailer", theTrailer);
        setTrailer(theTrailer);
      })
      .catch((err) => console.log(err));
  }, [params.id,id]);

  return (
    <div className="h-[100vh] ">
      <div className=" flex flex-row p-4">
        <Image
          className="max-w-[20%] min-w-[300px]"
          src={`${BASE_IMG_URL}/${movieDetails?.poster_path}`}
          alt=" movie poster image"
        />
        <div className=" px-4 text-left">
          <h1 className="MovieTitle">{movieDetails?.title.toUpperCase()}</h1>
          <p>{movieDetails?.overview}</p>
        </div>
      </div>

      {/* <iframe
    width="560"
    height="315"
    src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1`}
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
></iframe> */}

      <Footer />
    </div>
  );
};

export default Deatails;
