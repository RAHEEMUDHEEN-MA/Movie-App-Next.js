"use client";
import { BASE_URL } from "@/utils/Const";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SideBar = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      )
      .then(({ data }) => {
        setGenres(data.genres);
        console.log("api data", data.genres);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (searchParams.get("genre")) {
      setSelectedGenre(searchParams.get("genre").toString());
    } else {
      setSelectedGenre(params.id.toString());
    }
  }, [params.id, searchParams]);

  return (
    <>
      {/* Render your sidebar content here */}
    </>
  );
};

export default SideBar;
