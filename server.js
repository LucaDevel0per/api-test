import express from "express";
import publicRoutes from "./routes/public.js";
import privateRoutes from "./routes/private.js";

import auth from "./middlewares/auth.js";

const app = express();
app.use(express.json());

app.use('/', publicRoutes)
app.use('/', auth, privateRoutes)

// app.get('/', (req, res) => {
//     res.send("Olá, aplicação rodando!")
// })

app.listen(3000, () => {
    console.log(`http://localhost:3000`)
})
