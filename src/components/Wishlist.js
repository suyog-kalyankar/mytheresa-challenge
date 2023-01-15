import React from "react";
import { IMAGE_POSTER_PATH, NO_WISHLISTED_MOVIES } from "../constants/AppConstants";
import "./Wishlist.scss"

const Wishlist = ({ wishlist }) => {
    if (!wishlist.length) {
        return <p>{NO_WISHLISTED_MOVIES}</p>
    }
    return <div className="wishlist-container">
        {wishlist.map(movie => {
            return <div key={movie.id} className="wishlist-item"><img src={IMAGE_POSTER_PATH + movie.poster_path}/></div>
        })}
    </div>
}

export default Wishlist;