import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'
import { useSelector } from 'react-redux'

function ReplyComment(props) {

    const user = useSelector(state => state.user.userData)
    const [OpenReply, setOpenReply] = useState(false)
    const [ChildCommentNumber, setChildCommentNumber] = useState(null)


    useEffect(() => {
        let commentNumber = 0;

        props.commentLists.map((comment) => {
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++;
            }
            setChildCommentNumber(commentNumber)
        })

    }, [props.commentLists, props.parentCommentId])
    let renderReplyComment = (parentCommentId) =>

        props.commentLists.map((comment, index) =>
        (
            <React.Fragment>
                <div>
                </div>

                {comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment comment={comment} movieId={props.movieId} refreshFunction={props.refreshFunction} user={user} />
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} commentLists={props.commentLists} user={user} movieId={props.movieId} comment={comment} />
                    </div>
                }
            </React.Fragment>
        ))

    const onHandleChange = () => {
        setOpenReply(!OpenReply)
    }
    return (
        <div>
            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick={onHandleChange} >
                    View {ChildCommentNumber} more comments(s)
                            </p>
            }
            {OpenReply &&
                renderReplyComment(props.parentCommentId)
            }

        </div>
    )
}

export default ReplyComment
