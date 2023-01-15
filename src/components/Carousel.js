import React, { useEffect, useRef, useState } from "react";
import { CAROUSEL_DELAY_TIME, IMAGE_POSTER_PATH } from "../constants/AppConstants";
import { getMovieDetails } from "../service/Api";
import "./Carousel.scss"

const Carousel = ({ movies, onClickMovie }) => {
    const [index, setIndex] = useState(0);
    const ref = useRef(null);

    const resetTimeout = () => {
        if (ref.current) {
            clearTimeout(ref.current);
        }
    }

    const handleClick = movieId => {
        getMovieDetails(movieId).then(movieData => {
            onClickMovie(movieData);
        })
    }

    useEffect(() => {
        resetTimeout();
        ref.current = setTimeout(() => setIndex(prevIndex => prevIndex === movies.length - 1 ? 0 : prevIndex + 1), CAROUSEL_DELAY_TIME);
        return () => resetTimeout();
    }, [index])

    return (
        <div className="carousel">
            <div className="carousel-slider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                {movies.map(movie => {
                    return <div className="slide" key={movie.id} onClick={() => handleClick(movie.id)}>
                        <img src={IMAGE_POSTER_PATH + movie.poster_path} />
                    </div>
                })}
            </div>
            <div className="carousel-dots">
                {movies.map((movie, idx) => {
                    return <div key={movie.id} className={`carousel-dot${index === idx ? " active" : ""}`} onClick={() => {
                        setIndex(idx);
                    }}></div>
                })}
            </div>
        </div>
    )
}

export default Carousel;