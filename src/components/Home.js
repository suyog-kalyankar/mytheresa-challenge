import React, { useEffect, useState } from "react";
import { HOME_PAGE, MOVIE_DETAILS_PAGE, POPULAR_MOVIE, TOP_RATED_MOVIE, UPCOMING_MOVIE, WISHLIST_PAGE } from "../constants/AppConstants";
import { getAllPopularMovies, getAllTopRatedMovies, getAllUpcomingMovies } from "../service/Api";
import './Home.scss';
import MovieDetails from "./MovieDetails";
import Carousel from "./Carousel";
import Wishlist from "./Wishlist";

const Home = () => {
    const [movieList, setMovieList] = useState([]);
    const [selectedPage, setSelectedPage] = useState(HOME_PAGE)
    const [selectedMovieDetails, setSelectedMovieDetails] = useState({});
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        getAllUpcomingMovies().then(data => {
            addMovies(UPCOMING_MOVIE, data.results);
        });

        getAllTopRatedMovies().then(tr => {
            addMovies(TOP_RATED_MOVIE, tr.results);
        })

        getAllPopularMovies().then(popularMovie => {
            addMovies(POPULAR_MOVIE, popularMovie.results);
        });


    }, [])

    const addMovies = (type, value) => {
        let obj = {
            category: type,
            value: value
        }
        setMovieList(prevList => [...prevList, obj]);
    }

    const getMovieDetails = (movieDetails, category) => {
        let obj = { movieData: movieDetails, category: category }
        setSelectedMovieDetails(obj);
        setSelectedPage(MOVIE_DETAILS_PAGE);
    }

    const handleHome = () => {
        setSelectedPage(HOME_PAGE);
    }

    const addToWishlist = selectedMovie => {
        if (!wishlist.length) {
            setWishlist(preState => [...preState, selectedMovie]);
        } else if (wishlist.length && !wishlist.some(el => el.id === selectedMovie.id)) {
            setWishlist(preState => [...preState, selectedMovie]);
        }
    }

    const navigateToWishlist = () => {
        setSelectedPage(WISHLIST_PAGE);
    }

    return <div>
        <nav>
            <ul className="nav-header">
                <li><a href="#" onClick={handleHome}>{HOME_PAGE}</a></li>
                <li><a href="#" onClick={navigateToWishlist}>{WISHLIST_PAGE}</a></li>
            </ul>
        </nav>
        {selectedPage === HOME_PAGE && movieList.length === 3 && movieList.map((movies, index) => {
            return <div key={index}>
                <h3 className="movie-category">{movies.category}</h3>
                <Carousel movies={movies.value} onClickMovie={(movieDetails) => getMovieDetails(movieDetails, movies.category)} />
            </div>
        })
            || selectedPage === MOVIE_DETAILS_PAGE && <MovieDetails category={selectedMovieDetails.category} movieDetails={selectedMovieDetails.movieData} onClickWishlist={addToWishlist} />
            || selectedPage === WISHLIST_PAGE && <Wishlist wishlist={wishlist} />
        }
    </div>
}

export default Home;


