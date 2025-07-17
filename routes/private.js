import express from "express";
import { PrismaClient } from '../generated/prisma/index.js';

const router = express.Router();
const prisma = new PrismaClient()

router.get('/listar-users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        res.status(200).json({ message: "Users listados com sucesso", users })

    } catch(err) {
        res.status(500).json({ message: "Falha no servidor" })
    }
})

export default router