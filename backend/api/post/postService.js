//PostService에서 세부적인 함수 구현현

const { where } = require('sequelize');
const { post: Post } = require('../../models');

const create = async(title, description) => {
    try{
        const post = await Post.create({
            title: title,
            description: description
        }); //post를 구성하는 구조체
    } catch (err) {
        console.error("postService.create error");
        throw err;
    }
};

//post의 id를 가져와서 보내줌
const getOne = async (postId) => {
    try{
        const post = await Post.findOne({
            where: {
                postId: postId
            }
        }
        );
        console.log(post);
        return post;
    } catch (err) {
        console.error("postService.getOne error");
        throw err;
    }
};

const getAll = async () => {
    try {
        const posts = await Post.findAll();
        return posts.map(post => post.toJSON());
    }catch (err) {
        console.error("postService.getAll error");
        throw err;
    }
}

//deletePost
const deletePost = async(postId) => {
    try{
        const deletedCount = await Post.destroy({
            where: {
                postId: postId
            }
        });

        if(deletedCount === 0){
            throw new Error('존재하지 않는 게시글입니다.');
        }

        console.log(`postService.delete = deleted postId: ${postId}`);
        return deletedCount;
    }catch (err) {
        console.error('postService.delete error');
        throw err;
    }
};

//update
const update = async (postId, title, description) => {
    try {
        const [updatedCount] = await Post.update(
            { title, description },
            { where: { postId } }
        );

        if (updatedCount === 0) {
            throw new Error('수정할 게시글이 존재하지 않습니다.');
        }

        console.log(`postService.update - updated postId: ${postId}`);
        return updatedCount;
    } catch (err) {
        console.error('postService.update error');
        throw err;
    }
};

module.exports = {
    getOne,
    create,
    getAll,
    delete: deletePost,
    update
};