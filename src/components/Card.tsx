import { BASE_IMG_URL } from "@/utils/Const";
import Link from "next/link";
import { title } from "process";
import React, { useState } from "react";
import CardSkeleton from "./CardSkeleton";
interface prpsType {
  MoviePosterIMG: string;
  MovieID: string;
  MovieTitle: string;
  releaseDate: string;
}

const Card = ({
  MovieID,
  MovieTitle,
  MoviePosterIMG,
  releaseDate,
}: prpsType) => {
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState(false);
  return (
    <div className="group bg-primary h-[450px] md:h-[335px] w-[100%]">
      {!loading && !error && <CardSkeleton/>}
   {/* <CardSkeleton  /> */}
      {error && <CardSkeleton error />}

      <Link
        className={`${!loading && error && "hidden"}`}
        href={`/details/${MovieID}`}
      >
        <div className="relative">
          <img
            className="object-cover h-[450px] md:h-[335px] w-[100%]"
            src={`${BASE_IMG_URL}${MoviePosterIMG}`}
            alt="Movie Banner"
            onLoad={()=>setLoading(true)}
            onError={()=>seterror(true)}
          />
          <div className="absolute bg-primary w-[100%] bottom-0 px-4 py-2 text-center transition-all duration-500 opacity-0 group-hover:opacity-100">
            {MovieTitle}
            <p>{releaseDate}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
