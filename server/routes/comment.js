const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth')
const { Comment } = require('../models/Comments')


router.post('/saveComment', auth, (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, comment) => {
        if (err) return res.status(400).json({ success: false, err })
        Comment.find({ '_id': comment })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.status(400).send(err);
                res.status(200).json({ success: true, result })
            })

    })
})

router.post('/getComments', auth, (req, res) => {
    Comment.find({ 'movieId': req.body.movieId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, comments })
        })
})
module.exports = router;
