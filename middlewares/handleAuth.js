const { validationResult } = require('express-validator');
const { verify } = require('../helpers/authService');
const { prisma } = require('../utils/constants');
const { AUTH_ERROR, INVALID_TOKEN, USER_NOT_FOUND } = require('../utils/messages');

const validRequest = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) return next()
        const error = new Error(INVALID_TOKEN)
        error.statusCode = 200
        error.data = errors.array()
        next(error)
    } catch (error) {
        next(error)
    }
}

const authRequest = async (req, res, next) => {
    try {
        let authorization = req.headers['authorization']
        if (!authorization) throw new Error(AUTH_ERROR)
        let accessToken = authorization.split(' ')[1]
        if (!accessToken) throw new Error(INVALID_TOKEN)
        let decode = await verify(accessToken);
        const foundUser = await prisma.user.findFirst({ where: { uid: decode.uid } })
        if (!foundUser) {
            const error = new Error(USER_NOT_FOUND)
            error.statusCode = 401
            return next(error)
        }
        req['user'] = foundUser
        next();
    } catch (error) {
        error.statusCode = 401
        next(error);
    }
}

module.exports = {
    validRequest,
    authRequest,
}