import express from "express";

const app = express();

//middleware de log
function log(req, res, next) {
    console.log(`${req.method} - ${req.url}`)
    next()
}

function auth(req, res, next) {
    const token = req.headers.authorization;

    if (token === 'my-secret-token') {
        console.log('user autenticado.')
        next();
    } else {
        res.status(401).json({ erro: 'Não autorizado' });
    }
}

function isAdmin(req, res, next) {
    const admin = true;
    
    if (admin) {
        console.log("User é admin");
        next();
    } else {
        res.status(401).json({ erro: 'Não é admin.' });
    }
}

// app.get('/ping', (req, res) => {
//     res.send("Hello, ping!");
// })

// app.get('/painel', log, auth, isAdmin, (req, res) => {
//     res.send("Hello, painel!");
// })

// Middleware para ler JSON
app.use(express.json())


// app.use((req, res, next) => {
//     console.log(`${req.method} - ${req.url}`)
//     next()
// })


let users = [
    { id: 1, nome: "Luca", email: "luca@dev.com"},
    { id: 2, nome: "Jorge", email: "maria@dev.com"}
]

// GET all users
app.get('/users', (req, res) => {
    res.json(users)
})

//GET a single user
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id)

    if (!user) {
        return res.status(404).json({ erro: "User não encontrado."})
    }

    res.json(user)
})


app.post('/users', (req, res) => {
    const { nome, email } = req.body;
    const newUser = {
        id: users.length + 1,
        nome,
        email
    };
    users.push(newUser)
    res.status(201).json(newUser)
})

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
  
    if (!user) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
  
    users = users.filter(u => u.id !== id);
    res.json({ mensagem: "Usuário removido com sucesso" });
  });
  

app.put('/users/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const { nome, email } = req.body;

	const user = users.find(u => u.id === id)
	if (!user) {
		return res.status(404).json({ erro: "User não encontrado"})
	};

	  user.nome = nome || user.nome;
	  user.email = email || user.email;

	  res.json(user);
})


app.listen(3000, () => {
    console.log("Rodando...")
})

