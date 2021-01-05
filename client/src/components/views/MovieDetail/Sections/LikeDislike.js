import React from 'react'
import { Icon, Tooltip } from 'antd'
import react, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux'



function Like(props) {

    const userId = localStorage.getItem('userId')

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
    let variable = {}

    if (props.movieId) {
        variable = {
            movieId: props.movieId,
            userId: userId
        }
    } else {
        variable = {
            commentId: props.commentId,
            userId: userId
        }
    }

    useEffect(() => {

        Axios.post('/api/like/getLikes', variable)
            .then(res => {
                if (res.data.success) {
                    setLikes(res.data.likes.length)
                    res.data.likes.map(like => {
                        if (like.userId === userId) {
                            setLikeAction('liked');
                        }
                    })
                } else {
                    alert('좋아요를 가져오지 못했습니다.')
                }
            })
    }, [])
    const onClickLike = () => {
        if (LikeAction === null) {
            Axios.post('/api/like/upLike', variable)
                .then(res => {
                    if (res.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')
                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    } else {
                        alert('좋아요를 실패했습니다.')
                    }
                })
        } else {
            Axios.post('/api/like/unLike', variable)
                .then(res => {
                    if (res.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } else {
                        alert('좋아요를 해제하지 못했습니다.')
                    }
                })
        }

    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon
                        type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onClickLike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike" />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>0</span>
            </span>
        </div>
    )
}

export default Like
