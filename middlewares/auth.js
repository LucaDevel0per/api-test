import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {

    console.log(req.header.authorization);
    const token = req.headers.authorization

    if (!token) {
        res.status(401).json({ message: "Acesso negado" })
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)

        console.log(decoded)


    } catch (err) {
        return res.status(401).json({ message: "Token Inválido" })
    }
    next()
    // const token = 
}

export default auth;