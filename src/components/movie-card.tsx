import { useNavigate } from "react-router-dom";
import { months, wrapClick } from "../utils";
import CustomImage from "./Image";
import { StarIcon } from "@heroicons/react/16/solid";
export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
const MovieCard = ({ movie }: { movie: IMovie }) => {
  const navigate = useNavigate();
  return (
    <div
      className="h-fit relative cursor-pointer "
      onClick={wrapClick(() => {
        navigate(`movie/${movie.id}`);
      })}
    >
      <div className="relative hover:shadow-xl hover:-translate-y-2 hover:shadow-[#FFD700]/20 duration-500 cursor-pointer  ">
        <CustomImage
          id={movie?.backdrop_path}
          loaderclass="h-[250px] rounded-xl"
          className="object-cover h-[250px] rounded-xl w-full "
        />
        <div className="flex items-center justify-between absolute w-full bottom-0 backdrop-blur-xl rounded-b-xl p-2 text-white ">
          <div className="flex items-center bg-[#FFD700]/90 gap-2 lg:py-1 py-[0.19rem] px-2 rounded-2xl">
            <p className="text-[0.7rem] font-light">
              {" "}
              {Number(movie?.vote_average).toFixed(1)}
            </p>
            <StarIcon className="h-3" />
          </div>
          <p className="text-[0.8rem] font-light">
            {months[new Date(movie?.release_date).getMonth()]} -{" "}
            {new Date(movie?.release_date).getFullYear()}
          </p>
        </div>
      </div>

      <div className="bg-transparent lg:mt-2 mt-1">
        <p className="font-semibold">{movie.title}</p>
      </div>
    </div>
  );
};

export default MovieCard;
