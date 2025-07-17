import express from "express";
import publicRoutes from "./routes/public.js";

const app = express();
app.use(express.json());

app.use('/', publicRoutes)

// app.get('/', (req, res) => {
//     res.send("Olá, aplicação rodando!")
// })

app.listen(3000, () => {
    console.log(`http://localhost:3000`)
})

// lucadevel0per31
// GDbggBnOYol2jkQK
// mongodb+srv://lucadevel0per31:GDbggBnOYol2jkQK@users.owocuim.mongodb.net/?retryWrites=true&w=majority&appName=Users