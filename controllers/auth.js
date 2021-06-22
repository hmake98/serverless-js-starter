const { prisma } = require("../utils/constants");
const { createUser, admin, generateHash, compareHash } = require("../helpers/authService");
const sendResponse = require("../utils/response");

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email }
        })
        if (!user) {
            next({ message: 'User is not exists!' });
        }
        if (!compareHash(password, user.password)) {
            next({ message: 'Password not valid!' });
        }
        const token = await admin.auth().createCustomToken(user.uid);
        sendResponse(res, {
            statusCode: 200,
            message: 'Success',
            data: {
                accessToken: token,
                user
            },
        })
    } catch (err) {
        next(err);
    }
}

const signup = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const check_user = await prisma.user.findUnique({
            where: { email }
        })
        if (check_user) {
            next({ message: 'User already exists!' });
        }
        const firebase_user = await createUser({ email, password });
        const hash = generateHash(password);
        const user = await prisma.user.create({ data: { name, email, password: hash, uid: firebase_user.uid } });
        delete user.password;
        const token = await admin.auth().createCustomToken(firebase_user.uid)
        sendResponse(res, {
            statusCode: 200,
            message: 'Created',
            data: {
                accessToken: token,
                user
            },
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    login,
    signup,
}