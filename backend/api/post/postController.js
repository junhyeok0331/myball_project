//PostController에서 API 함수를 만들고

const express = require('express');
const router = express.Router();
const postService = require('./postService');

//createPost
const createPost = async(req, res, next) => {
    try{
        const { title, description } = req.body;
        console.log(`createPost - title: ${title}, description: ${description}`);
        await postService.create(title, description); //Post 생성 부분분
        res.status(200).json({title, description});
    } catch (err) {
        res.status(404);
        next(err);
    }
}

//getPost
const getPost = async(req, res, next) => {
    try{
        const id = parseInt(req.params.id);
        console.log(`getPost - postId: ${id}`);
        const post = await postService.getOne(id);
        res.status(200).json(post);
    } catch (err){
        res.status(404);
        next(err);
    }
};

//getAllPosts
const getAllPosts = async(req, res, next) => {
    try{
        const posts = await postService.getAll();
        console.log('getAllPosts');
        res.status(200).json(posts);
    } catch (err){
        res.status(404);
        next(err);
    }
};

//deletePost
const deletePost = async(req, res, next) => {
    try {
        const postId = parseInt(req.params.id);
        console.log(`deletePost - postId: ${postId}`);
        await postService.delete(postId);
        res.status(200).json('삭제 완료');
    } catch (err) {
        res.status(404);
        next(err);
    }
};

//updatePost
const updatePost = async (req, res, next) => {
    try {
        const postId = parseInt(req.params.id);
        const { title, description } = req.body;

        console.log(`updatePost - postId: ${postId}, title: ${title}, description: ${description}`);

        await postService.update(postId, title, description);
        res.status(200).json({ title, description });
    } catch (err) {
        res.status(404);
        next(err);
    }
};

router.get('/getOne/:id', getPost);
router.post('/postCreate', createPost);
router.get('/getAll', getAllPosts);
router.delete('/delete/:id', deletePost);
router.put('/update/:id', updatePost);
module.exports = router;