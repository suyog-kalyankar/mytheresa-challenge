import { API_KEY, BASE_URL, POPULAR, TOP_RATED, UPCOMING } from "../constants/AppConstants";


/*
// To get all upcoming movies list
*/
export const getAllUpcomingMovies = async () => {
    const upcomingMoviesPromise = await fetch(BASE_URL + UPCOMING + API_KEY);
    const response = await upcomingMoviesPromise.json();
    return response;
}

/*
// To get all top rated movies list
*/
export const getAllTopRatedMovies = async () => {
    const topRatedMoviesPromise = await fetch(BASE_URL + TOP_RATED + API_KEY);
    const response = await topRatedMoviesPromise.json();
    return response;
}

/*
// To get all popular movies list
*/
export const getAllPopularMovies = async () => {
    const popularMoviesPromise = await fetch(BASE_URL + POPULAR + API_KEY);
    const response = await popularMoviesPromise.json();
    return response;
}

/*
// To get movie details using movie id
*/
export const getMovieDetails = async (id) => {
    const movieDetails = await fetch(BASE_URL + id + API_KEY);
    const response = await movieDetails.json();
    return response;
}