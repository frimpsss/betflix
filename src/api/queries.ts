import { apiInstance } from "../config";

export async function listAllMovies(page: number) {
  try {
    const response = await apiInstance({
      url: `/4/list/${page}`,
      method: "get",
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function findSingleMovie(id: string) {
  try {
    const response = await apiInstance({
      url: `/3/movie/${id}`,
      method: "get",
    });
    return response;
  } catch (error) {
    throw error;
  }
}

// https://api.themoviedb.org/3/movie/
