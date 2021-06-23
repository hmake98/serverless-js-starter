const { prisma } = require('../utils/helpers');
const sendResponse = require('../utils/response');

const createPost = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { title } = req.body;
        const post = await prisma.post.create({
            data: {
                title,
                author: {
                    connect: {
                        id
                    }
                },
                published: true,
            }
        })
        sendResponse(res, {
            statusCode: 200,
            message: 'Created',
            data: post,
        });
    } catch (err) {
        next(err);
    }
}

const listPosts = async (req, res, next) => {
    try {
        const { id } = req.user;
        const posts = await prisma.post.findMany({
            where: {
                authorId: id,
            }
        })
        sendResponse(res, {
            statusCode: 200,
            message: 'Success',
            data: posts,
        });
    } catch (err) {
        next(err);
    }
}

const listPost = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { id } = req.params;
        const post = await prisma.post.findFirst({
            where: {
                authorId: userId,
                id,
            }
        })
        sendResponse(res, {
            statusCode: 200,
            message: 'Success',
            data: post,
        });
    } catch (err) {
        next(err);
    }
}

const updatePost = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { id, ...rest } = req.body;
        const post = await prisma.post.update({
            where: { id },
            data: {
                author: {
                    connect: {
                        id: userId
                    }
                },
                ...rest,
            }
        })
        sendResponse(res, {
            statusCode: 200,
            message: 'Updated',
            data: post,
        });
    } catch (err) {
        next(err);
    }
}

const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await prisma.post.delete({
            where: {
                id,
            }
        })
        sendResponse(res, {
            statusCode: 200,
            message: 'Deleted',
            data: response,
        });
    } catch (err) {
        next(err);
    }
}


module.exports = {
    createPost,
    listPosts,
    listPost,
    updatePost,
    deletePost,
}