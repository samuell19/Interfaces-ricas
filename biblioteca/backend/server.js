const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'db.json');
const PORT = 3000;
const SECRET_KEY = 'segredo-secreto'; 

function readDB() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Erro ao ler db.json', err);
    return { Pokemon: [], Usuarios: [] };
  }
}

function writeDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}
function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET_KEY, (err, usuario) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.usuario = usuario;
    next();
  });
}

app.post('/login', (req, res) => {
  const { nome, senha } = req.body;
  const db = readDB();
  const usuario = (db.Usuarios || []).find(u => u.nome === nome && u.senha === senha);

  if (!usuario) {
    return res.status(401).json({ error: 'Usuário ou senha incorretos' });
  }


  const token = jwt.sign(
    { id: usuario.id, nome: usuario.nome },
    SECRET_KEY,
    { expiresIn: '1h' } 
  );

  res.json({ token });
});

app.get('/Pokemon', verificarToken, (req, res) => {
  const db = readDB();
  res.json(db.Pokemon || []);
});

app.get('/Pokemon/:id', verificarToken, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const p = (db.Pokemon || []).find(x => String(x.id) === String(id));
  if (!p) return res.status(404).json({ error: 'Pokemon não encontrado' });
  res.json(p);
});

app.post('/Pokemon', verificarToken, (req, res) => {
  const db = readDB();
  const list = db.Pokemon || [];

  const novo = { id: Date.now().toString(36) + Math.random().toString(36).slice(2,6), ...req.body };
  list.push(novo);
  db.Pokemon = list;
  writeDB(db);

  res.status(201).json(novo);
});

app.put('/Pokemon/:id', verificarToken, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const list = db.Pokemon || [];
  const idx = list.findIndex(x => String(x.id) === String(id));
  if (idx === -1) return res.status(404).json({ error: 'Pokemon não encontrado' });

  const atualizado = { ...list[idx], ...req.body, id: list[idx].id };
  list[idx] = atualizado;
  db.Pokemon = list;
  writeDB(db);

  res.json(atualizado);
});

app.delete('/Pokemon/:id', verificarToken, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const list = db.Pokemon || [];
  const idx = list.findIndex(x => String(x.id) === String(id));
  if (idx === -1) return res.status(404).json({ error: 'Pokemon não encontrado' });

  list.splice(idx, 1);
  db.Pokemon = list;
  writeDB(db);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`API do Pokemon rodando em http://localhost:${PORT}`);
});


