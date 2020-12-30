import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage'

function LandingPage() {

    const [Moives, setMoives] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)


    useEffect(() => {
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en_us&page=1`;
        fetch(endPoint)
            .then(res => res.json())
            .then(res => {
                setMoives([res.results])
                setMainMovieImage(res.results[0])
            })
    })

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {MainMovieImage &&
                <MainImage image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.title}
                    text={MainMovieImage.overview}
                />
            }
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2>Movie by latest</h2>
                <hr />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
