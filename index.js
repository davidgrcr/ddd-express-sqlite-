const express = require('express');
const router = require("./src/interfaces/http/routes.js");

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Definir rutas
app.use("/api", router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API ejecutándose en el puerto ${port}`);
});
