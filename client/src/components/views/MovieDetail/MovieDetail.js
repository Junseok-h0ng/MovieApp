import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import { Row, Button, List } from 'antd'
import { useSelector } from 'react-redux'

import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../commons/GridCards'
import Favorite from './Sections/Favorite'
import Comment from './Sections/Comment'
import Axios from 'axios'
import LikeDislike from './Sections/LikeDislike.js'

function MovieDetail(props) {
    const user = useSelector(state => state.user)
    let movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    const [Comments, setComments] = useState([])


    const variable = { movieId: movieId }

    useEffect(() => {

        let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        fetch(endPointInfo)
            .then(res => res.json())
            .then(res => {
                setMovie(res)
            })


        fetch(endPointCrew)
            .then(res => res.json())
            .then(res => {
                setCasts(res.cast)
            })
        Axios.post('/api/comment/getComments', variable)
            .then(res => {
                if (res.data.success) {
                    setComments(res.data.comments);
                } else {
                    alert("코멘트 정보를 가져오는 것을 실패 했습니다.")
                }
            })

    }, [])


    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    const refreshFunction = (newComment) => {
        console.log(newComment)
        setComments(Comments.concat(newComment))
    }

    return (


        <div>
            {/* Header */}
            {Movie &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.title}
                    text={Movie.overview}
                />
            }
            {/* Body */}

            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>
                {/* Movie Info */}
                <MovieInfo
                    movie={Movie}
                />

                <br />
                {/* Actors Grid */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>                   <LikeDislike />
                </div>



                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={toggleActorView}>Toggle Actor View</Button>
                </div>
                {ActorToggle &&
                    <Row gutter={[16, 16]}>

                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={cast.profile_path ?
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    characterName={cast.name}
                                />
                            </React.Fragment>
                        ))}

                    </Row>
                }
                <Comment movieId={movieId} commentLists={Comments} refreshFunction={refreshFunction} />
            </div>
        </div >
    )
}

export default MovieDetail
