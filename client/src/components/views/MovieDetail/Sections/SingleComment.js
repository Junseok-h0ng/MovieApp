import React, { useState } from 'react'
import { Comment, Avatar } from 'antd'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import LikeDislikes from './LikeDislike'

function SingleComment(props) {


    const user = useSelector(state => state.user.userData)
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)


    const onChangeComment = (e) => {
        setCommentValue(e.currentTarget.value)
    }
    const onClickSubmit = (e) => {
        e.preventDefault()

        let variable = {
            movieId: props.movieId,
            comment: CommentValue,
            writer: user._id,
            responseTo: props.comment._id
        }

        Axios.post('/api/comment/saveComment', variable)
            .then(res => {
                if (res.data.success) {
                    props.refreshFunction(res.data.result);
                    setCommentValue("");
                    setOpenReply(!OpenReply)
                } else {
                    alert('코멘트 저장이 실패했습니다.')
                }
            })
    }
    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }
    const actions = [
        <LikeDislikes commentId={props.comment._id} />,
        < span style={{ marginLeft: '1rem' }} onClick={onClickReplyOpen} > Reply to</span >
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt />}
                content={<p>{props.comment.comment}</p>}
            />
            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onClickSubmit}>
                    <textarea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onChangeComment}
                        value={CommentValue}
                        placeholder="코멘트를 작성해 주세요"
                    />
                    <br />
                    <button style={{ widht: '20%', height: '52px' }} onClick={onClickSubmit}>Submit</button>
                </form>
            }
        </div>
    )
}

export default SingleComment
