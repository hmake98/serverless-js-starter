const admin = require('firebase-admin');
const serviceAccount = require('../firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const createUser = (data) => {
    return new Promise((resolve, reject) => {
        const { email, password } = data;
        admin.auth().createUser({ email, password }).then((data) => {
            resolve(data);
        }).catch(err => {
            reject(err);
        })
    })
}

const verify = (accessToken) => {
    return new Promise((resolve, reject) => {
        admin.auth().verifyIdToken(accessToken).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    })
}

const createToken = (uid) => {
    return new Promise((resolve, reject) => {
        admin.auth().createCustomToken(uid).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    })
}

module.exports = {
    createUser,
    verify,
    createToken,
}