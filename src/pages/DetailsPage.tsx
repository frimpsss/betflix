import { useLocation, useNavigate } from "react-router-dom";
import { ISingleMovie, wrapClick } from "../utils";
import { useQuery } from "react-query";
import { findSingleMovie } from "../api/queries";
import { useState } from "react";
import CustomImage from "../components/Image";
import { isAxiosError } from "axios";

const DetailsPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [movieData, setMovieData] = useState<ISingleMovie>();
  const id = pathname.split("/")[2];
  const { isLoading, isFetching, isError, error } = useQuery({
    queryFn: () => findSingleMovie(id),
    onSuccess: (data) => {
      setMovieData(data.data as ISingleMovie);
    },
  });


  if ((!isLoading || !isFetching) && isError) {
    return (
      <div className="p-6 lg:w-[850px] mx-auto relative pb-8 text-center">
        <p className="text-[1.2rem]">An error occured😞</p>
        {isAxiosError(error) && (
          <p className="text-red-600 font-light text-[0.9rem]">
            Error: {error.response?.data?.status_message}
          </p>
        )}
        <h4
          className="underline mt-6 cursor-pointer"
          onClick={wrapClick(() => {
            navigate("/");
          })}
        >
          Go Home
        </h4>
      </div>
    );
  }
  return (
    <div className="p-6 lg:w-[850px] mx-auto relative pb-8">
      <div className="lg:text-[1.4rem] text-[0.9rem] mb-4 lg:mb-6 flex items-center gap-3 z-10">
        <h4
          className="hover:underline cursor-pointer"
          onClick={wrapClick(() => {
            navigate("/");
          })}
        >
          Discover Movies
        </h4>
        <p className="text-[1.2rem]"> {" > "}</p>
        {isLoading || isFetching ? (
          <div className="bg-gray-200 animate-pulse h-[30px]  w-[150px] lg:h-[40px] rounded-md lg:w-[200px]"></div>
        ) : (
          <p className="">{movieData?.title}</p>
        )}
      </div>

      {isLoading || isFetching ? (
        <div className="bg-gray-200 animate-pulse lg:h-[800px] h-[400px] rounded-md w-full"></div>
      ) : (
        <div className=" w-full relative lg:h-[800px] h-[400px] ">
          <CustomImage
            id={movieData?.backdrop_path as string}
            className="absolute z-[-10] w-full object-cover top-0 left-0 right-0 h-full rounded-2xl "
            loaderclass="lg:h-[800px] h-[400px]  rounded-xl"
          />
          <div className="text-white backdrop-blur-[6px] bg-black/40 h-full flex flex-col justify-center gap-8 items-center  pt-8 rounded-2xl">
            <div className="flex justify-center w-full">
              <CustomImage
                id={movieData?.poster_path as string}
                loaderclass="h-[230px]  rounded-xl"
                className="object-center lg:h-[320px] h-[180px] lg:w-[200px] rounded-xl "
              />
            </div>
            <div className="flex items-center flex-col">
              <p className="lg:text-[1.7rem] text-[1.1rem] text-center font-semibold">
                {movieData?.title} (
                {new Date(movieData?.release_date as string).getFullYear()})
              </p>
              <p className="lg:text-[1.1rem] text-[0.8rem] w-[70%] lg:w-fit font-light text-center">
                {movieData?.release_date} •{" "}
                {movieData?.genres?.map((e, inx: number) => (
                  <span key={e.id}>
                    {e.name} {inx != movieData?.genres?.length - 1 && " , "}
                  </span>
                ))}
                • {Number(movieData?.vote_average).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      )}

      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 gap-4 mt-10 pb-6">
          <div className="flex flex-col gap-3">
            <div className="bg-gray-200 animate-pulse h-[30px] rounded-md w-[130px]"></div>
            <div className="bg-gray-200 animate-pulse h-[90px] rounded-md w-full"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-gray-200 animate-pulse h-[30px] rounded-md w-[130px]"></div>
            <div className="bg-gray-200 animate-pulse h-[90px] rounded-md w-full"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-gray-200 animate-pulse h-[30px] rounded-md w-[130px]"></div>
            <div className="bg-gray-200 animate-pulse h-[90px] rounded-md w-full"></div>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-4">
          <div>
            <h4 className="font-semibold  text-[1.2rem] lg:text-[1.5rem]">
              Overview
            </h4>
            <p className="lg:text-[1.05rem] text-[0.8rem] font-light">
              {movieData?.overview}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[1.2rem] lg:text-[1.5rem]">
              Production Companies
            </h4>
            <p className="lg:text-[1.05rem] text-[0.8rem] font-light">
              {movieData?.production_companies?.map((e, inx: number) => (
                <span key={e.name}>
                  {e.name} ({e?.origin_country}){" "}
                  {inx != movieData?.production_companies?.length - 1 && " , "}
                </span>
              ))}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[1.2rem] lg:text-[1.5rem]">
              Spoken Languages
            </h4>
            <p className="lg:text-[1.05rem] text-[0.8rem] font-light">
              {movieData?.spoken_languages?.map((e, inx: number) => (
                <span key={e.english_name}>
                  {e.english_name}{" "}
                  {inx != movieData.spoken_languages?.length - 1 && " , "}
                </span>
              ))}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
