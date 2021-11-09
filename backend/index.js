// Importacion del modulo Express bajo el alias express
const express = require("express");
// Genera una nueva instancia de express
const app = express();
// Se define en una constante el numero del puerto sobre el que se va a ejecutar el servidor
const port = 3000;

// Se define el método de escucha de tipo GET en la ruta raiz ("/") y la respuesta que se dará a esta petición,
// en este caso, se devuelve un mensaje con el texto "Hello World"
app.get("/", (req, res) => {
  res.send("Hola Mundo!");
});

// Se coloca a escuchar (ejecutar) el servidor web con el uso del método listen, el método listen recibe
// dos parámetros, el puerto en el que va a escuchar el servidor y una función anónima con una ejecución de código
// al momento de montar el servidor
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
