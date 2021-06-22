const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const serviceAccount = require('../firebase.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const createUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = data;
        admin.auth().createUser({ email, password }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    })
}

const generateHash = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

const compareHash = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

const verify = async (accessToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await admin.auth().verifyIdToken(accessToken);
            resolve(data);
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    admin,
    generateHash,
    compareHash,
    createUser,
    verify,
}