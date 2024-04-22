const express = require("express");
const app = express();
const port = 3000;
app.use(express.static("assets"));

const usuarios = [
  "Juan",
  "Jocelyn",
  "Astrid",
  "Maria",
  "Ignacia",
  "Javier",
  "Brian",
];

app.get("/", (req, res) => res.send("Página principal"));
app.get("/abracadabra/usuarios", (req, res) => {
  res.json(usuarios);
});

app.get("/abracadabra/conejo/:n", (req, res) => {
  const n = +req.params.n;
  const num = Math.floor(Math.random() * 4) + 1;
  if (n === num) {
    res.sendFile(__dirname + "/assets/img/conejito.jpg");
  } else {
    res.sendFile(__dirname + "/assets/img/voldemort.jpg");
  }
});
app.get("/abracadabra/juego/:usuario", (req, res, next) => {
  const userName = req.params.usuario
  const user = usuarios.map((u) => u.toLowerCase()).includes(userName.toLowerCase());

  user ? next() : res.sendFile(__dirname + "/assets/img/who.jpeg");
});
app.get('/abracadabra/juego/:usuario', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});
app.get("*", (req, res) => {
  res.send("<center><h1>ERROR 404: Esta pagino no existe</h1></center>");
});
app.listen(port, () =>
  console.log(`🔥SERVER ONLINE🔥 en port http://localhost:${port}`)
);
