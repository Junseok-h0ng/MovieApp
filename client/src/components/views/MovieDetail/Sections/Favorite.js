import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'antd';

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
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    const onClickFavorite = () => {

        if (Favorited) {
            axios.post('/api/favorite/removeFromFavorite', variable)
                .then(res => {
                    if (res.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트에서 지우는 걸 실패 했습니다.')
                    }
                })
        } else {
            axios.post('/api/favorite/addFavorite', variable)
                .then(res => {
                    if (res.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트에 추가하는 걸 실패 했습니다.')
                    }
                })
        }

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
            <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite " : "Add to Favorite "}{FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
