const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth')
const { Like } = require('../models/Like')
const { Dislike } = require('../models/Dislike')


router.post('/getLikes', auth, (req, res) => {
    let variable = {}
    if (req.body.movieId) {
        variable = {
            movieId: req.body.movieId
        }
    } else {
        variable = {
            commentId: req.body.commentId
        }
    }
    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, likes })
        })
});

router.post('/upLike', auth, (req, res) => {
    let variable = {}
    if (req.body.movieId) {
        variable = {
            movieId: req.body.movieId,
            userId: req.body.userId
        }
    } else {
        variable = {
            commentId: req.body.commentId,
            userId: req.body.userId
        }
    }

    const like = new Like(variable);
    like.save((err, like) => {
        if (err) return res.status(400).send(err);
        Dislike.findOneAndDelete(variable)
            .exec((err, result) => {
                if (err) return res.status(400).send(err);
                res.status(200).json({ success: true })
            })
    })
});

router.post("/unLike", auth, (req, res) => {

    let variable = {};

    if (req.body.videoId) {
        variable = { movieId: req.body.videoId, userId: req.body.userId }
    } else {
        variable = { commentId: req.body.commentId, userId: req.body.userId }
    }

    // Like collection에다가 정보를 넣어준다.

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })
});

router.post("/getDislikes", auth, (req, res) => {
    let variable = {};
    if (req.body.movieId) {
        variable = {
            movieId: req.body.movieId,
            userId: req.body.userId
        }
    } else {
        variable = {
            commentId: req.body.commentId,
            userId: req.body.userId
        }
    }

    Dislike.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, dislikes })
        })
})

router.post('/upDislike', auth, (req, res) => {
    let variable = {};
    if (req.body.movieId) {
        variable = {
            movieId: req.body.movieId,
            userId: req.body.userId
        }
    } else {
        variable = {
            commentId: req.body.commentId,
            userId: req.body.userId
        }
    }
    console.log(req.body)
    const dislike = new Dislike(variable);
    dislike.save((err, dislike) => {
        if (err) return res.status(400).send(err);
        Like.findOneAndDelete(variable)
            .exec((err, result) => {
                if (err) return res.status(400).send(err);
                return res.status(200).json({ success: true })
            })
    })
})
router.post('/unDislike', auth, (req, res) => {
    let variable = {};
    if (req.body.movieId) {
        variable = {
            movieId: req.body.movieId,
            userId: req.body.userId
        }
    } else {
        variable = {
            commentId: req.body.commentId,
            userId: req.body.userId
        }
    }
    Dislike.findOneAndDelete(variable)
        .exec((err, result) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true })
        })
})

module.exports = router;
