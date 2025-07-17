import express from "express";
import bcrypt from 'bcrypt';
import { PrismaClient } from '../generated/prisma/index.js';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient()
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Cadastro
router.post('/cadastro', async (req, res) => {
    try {
        const user = req.body;
        
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password, salt)

        const userDB = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword
            }
        })
        res.status(201).json(userDB)

    } catch (err) {
        res.status(500).json({ message: "Server Error. Try again later." })
    }
})

// Login
router.post('/login', async (req, res) => {
    try {
        const userInfo = req.body;
        // Busca o user no bD
        const user = await prisma.user.findUnique({ 
            where: { email: userInfo.email }
        })
        // Verifica se o user está no BD
        if (!user) {
            return res.status(404).json({ erro: "User não encontrado." })
        }
        // Verificar a senha
        const isMatch = await bcrypt.compare(userInfo.password, user.password)
        if (!isMatch) {
            return res.status(401).json({ erro: "Senha incorreta." })
        }
        // Gerar token JWT
        const token = jwt.sign({ id: user.id }, JWT_SECRET, {expiresIn: '1m' })

        // Login bem-sucedido
        res.status(200).json({ 
            message: "Login realizado com sucesso!",
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            token
        })
    } catch (err) {
        res.status(500).json({ message: "Server Error. Try again later." })
    }
})


export default router