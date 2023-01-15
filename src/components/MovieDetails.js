import React from "react";
import { ADD_TO_WISHLIST, IMAGE_POSTER_PATH } from "../constants/AppConstants";
import './MovieDetails.scss';

const MovieDetails = ({ movieDetails, onClickWishlist, category }) => {

    const addToWishlist = () => {
        onClickWishlist(movieDetails);
    }

    return <div className="container">
        <div className="primary-block">
            <div className="poster-block">
                <img src={IMAGE_POSTER_PATH + movieDetails.poster_path} />
            </div>
            <div className={"description-area " + category}>
                <button onClick={addToWishlist}>{ADD_TO_WISHLIST}</button>
                <p>{movieDetails.title} :- {movieDetails.tagline}</p>
                <p>Overview : {movieDetails.overview}</p>
                <p>Genere : {movieDetails.genres.map((genre, index) => {
                    return <span key={genre.id}>{genre.name + ((movieDetails.genres.length !== index + 1) && ", " || "")}</span>
                })}
                </p>
                <p>Release Date : {movieDetails.release_date}</p>
            </div>
        </div>
        <div className={"secondary-block " + category}>
            <p> Languages : {movieDetails.spoken_languages.map((language, index) => {
                    return <span key={index}>{language.name + ((movieDetails.spoken_languages.length !== index + 1) && ", " || "")}</span>
                })}
            </p>
            <p> Production companies : {movieDetails.production_companies.map((production, index) => {
                    return <span key={production.id}>{production.name + ((movieDetails.production_companies.length !== index + 1) && ", " || "")}</span>
                })}
            </p>
            <p>Budget : ${movieDetails.budget}</p>
            <p>Status : {movieDetails.status}</p>
        </div>
    </div>
}

export default MovieDetails;