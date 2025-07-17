import express from "express";

const app = express();
const PORT = 3001

let tasks = [
    { id: 1, task: "Estudar Matemática", description: "Rever conceitos de fração" },
    { id: 2, task: "Estudar Gramática", description: "Fazer redações" }
]

app.get('/', (req, res) => {
    res.send("Aplicativo de Tarefas")
})


app.get("/tasks", (req, res) => {
    res.json(tasks)
})


app.listen(PORT, () => {
    console.log(`Rodando em: http://localhost:${PORT}`)
})