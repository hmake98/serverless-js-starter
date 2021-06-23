const { prisma } = require('../utils/helpers');
const sendResponse = require('../utils/response');

const listUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        sendResponse(res, {
            statusCode: 200,
            message: 'Success',
            data: users,
        })
    } catch (err) {
        next(err);
    }
}

const listUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
        sendResponse(res, {
            statusCode: 200,
            message: 'Success',
            data: user,
        })
    } catch (err) {
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { id, ...rest } = req.body;
        const user = await prisma.user.update({
            where: { id },
            data: { ...rest }
        })
        sendResponse(res, {
            statusCode: 200,
            message: 'Updated',
            data: user,
        })
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await prisma.user.delete({
            where: { id: parseInt(id) },
        })
        sendResponse(res, {
            statusCode: 200,
            message: 'Deleted',
            data,
        })
    } catch (err) {
        next(err);
    }
}


module.exports = {
    listUsers,
    listUser,
    updateUser,
    deleteUser,
}