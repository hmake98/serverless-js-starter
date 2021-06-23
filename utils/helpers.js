const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const generateHash = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

const compareHash = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    prisma,
    compareHash,
    generateHash,
}