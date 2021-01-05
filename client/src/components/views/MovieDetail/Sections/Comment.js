import Axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'


import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

function Comment(props) {
    const user = useSelector(state => state.user.userData)
    const movieId = props.movieId

    const [CommentValue, setCommentValue] = useState("")

    const onChangeComment = (e) => {
        setCommentValue(e.currentTarget.value)
    }
    const onClickSubmit = (e) => {
        e.preventDefault()

        let variable = {
            movieId: movieId,
            comment: CommentValue,
            writer: user._id
        }

        Axios.post('/api/comment/saveComment', variable)
            .then(res => {
                if (res.data.success) {
                    props.refreshFunction(res.data.result);
                    setCommentValue("")
                } else {
                    alert('코멘트 저장이 실패했습니다.')
                }
            })
    }



    return (


        <div>

            <br />
            <p>Replies</p>
            <hr />
            {/* 코멘트 출력 */}
            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} movieId={movieId} />
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} commentLists={props.commentLists} user={user} movieId={props.movieId} comment={comment} />
                    </React.Fragment>
                )
            ))}

            {/* 코멘트 입력 */}
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
        </div>
    )
}

export default Comment
