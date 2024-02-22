"use client"

import { MovieType } from '@/app/discover/[id]/page';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import LoadingPage from '@/components/LoadingPage';
import { BASE_URL } from '@/utils/Const';
import axios from 'axios';
import { useParams, useSearchParams ,useRouter} from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

const Genres = () => {
    const [title, settitle] = useState("");
    const [movies, setmovies] = useState([]);
    // console.log("movies from api",movies)
    const [currentPage, setcurrentPage] = useState(1);
    const [totalPage, settotalPage] = useState(1);
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
  
      const id = params.id;
      console.log("genre id:",id)
      const page = searchParams.get("page");
      const genre=searchParams.get("genre")

      settitle(`${genre} Movies`);
    
      
      axios
        .get(`${BASE_URL}/discover/movie`, {
          params: {
            api_key: process.env.NEXT_PUBLIC_API_KEY,
            with_genres:id,
            page,
          },
        })
        .then((response) => {
          console.log("genre wise response :", response);
  
          setmovies(response.data.results);
          setcurrentPage(response.data.page);
          settotalPage(response.data.total_page);
        })
        .catch((err) => console.log(err));
    }, [params.id, searchParams]);
  
    const PageNavigation = (button: string) => {
      let page = "";
      if (button === "prev") {
        page = `page=${currentPage - 1}`;
      } else {
        page = `page=${currentPage + 1}`;
      }
      router.push(`/genres/${params.id}?genre=${searchParams.get("genre")}&${page}`);
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
            className={`bg-purple-800 p-2 px-8 rounded-md hover:bg-purple-900 ${
              currentPage === 1 && "hidden"
            }`}
          >
            Back
          </button>
  
          <button
            onClick={() => {
              PageNavigation("next");
            }}
            className={`bg-purple-800 p-2 px-8 hover:bg-purple-900 rounded-md ${
              currentPage === totalPage && "hidden"
            }`}
          >
            Next
          </button>
         
        </div>
        <Footer/>
      </main>
    );
}

export default Genres
