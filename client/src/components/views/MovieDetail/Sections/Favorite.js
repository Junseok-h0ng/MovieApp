import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false)

    let variable = {
        userFrom: userFrom,
        movieId: movieId
    }
    useEffect(() => {
        axios.post('/api/favorite/favoriteNumber', variable)
            .then(res => {
                if (res.data.success) {
                    setFavoriteNumber(res.data.favoriteNumber);
                } else {
                    alert('Failed to get Favorite Number');
                }
            })

        axios.post('/api/favorite/favorited', variable)
            .then(res => {
                if (res.data.success) {
                    setFavorited(res.data.favorited);
                } else {
                    alert('Failed to get Favorite Number');
                }
            })
    }, [])


    return (
        <div>
            <button>{Favorited ? "Not Favorite" : "Add to Favorite "}{FavoriteNumber}</button>
        </div>
    )
}

export default Favorite
