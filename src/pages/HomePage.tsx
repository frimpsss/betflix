import { useQuery } from "react-query";
import { listAllMovies } from "../api/queries";
import MovieCard, { IMovie } from "../components/movie-card";
import { useState } from "react";
import { isAxiosError } from "axios";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const { isFetching, isLoading, isError, error } = useQuery({
    queryFn: () => listAllMovies(currentPage),
    queryKey: ["all-movies", currentPage],
    onSuccess: (data) => {
      setMovies((prev) => [...prev, ...data.data?.results]);
    },
    refetchOnWindowFocus: false,
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
      </div>
    );
  }
  return (
    <div className="p-6  lg:w-[850px] mx-auto">
      <h4 className="lg:text-[2.3rem] md:text-[1.5rem] text-[1.5rem] mb-4 lg:mb-6">
        Discover Movies
      </h4>
      {(isFetching || isLoading) && currentPage == 1 ? (
        <div className="animate-pulse grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {new Array(12).fill(null)?.map((_, inx) => {
            return (
              <div key={inx} className="bg-gray-200 h-[250px] rounded-xl"></div>
            );
          })}
        </div>
      ) : (
        <>
          <div className="grid gap-6  grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies?.map((movie) => {
              return <MovieCard key={movie.title} movie={movie} />;
            })}
          </div>

          <div className="grid place-items-center my-6">
            <button
              disabled={isFetching || isLoading}
              className="w-fit px-6 py-3 bg-black text-white mx-auto rounded-2xl"
              onClick={() => {
                setCurrentPage((p) => p + 1);
              }}
            >
              {(isFetching || isLoading) && currentPage != 1
                ? "loading"
                : "load more"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
