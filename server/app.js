const express = require('express');
const mysql = require('mysql');
const session = require('express-session');

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user'
});

// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Middleware para analizar JSON y URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la sesión
app.use(session({
  secret: 'secreto', // Cambia esto por una cadena secreta más segura
  resave: false,
  saveUninitialized: true
}));

// Configuración del motor de plantillas (ejs en este caso)

app.post('/registro', (req, res) => {
  const { nombre, apellido, email, contraseña } = req.body;
  // Consulta SQL para insertar los datos en la tabla de usuarios
  const sql = `INSERT INTO user (name, lastname, mail, password, date_register) VALUES (?, ?, ?, ?, NOW())`;
  connection.query(sql, [nombre, apellido, email, contraseña], (err, result) => {
    if (err) {
      console.error('Error al insertar los datos:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }
    console.log('Registro exitoso');
    req.session.loggedin = true;
    // Redireccionar al usuario a una página de bienvenida o a donde desees
    res.redirect('/bienvenida');
  });
});


app.post('/ingreso', (req, res) => {
  // Obtener los datos del formulario
  const { email, contraseña } = req.body;

  // Consulta SQL para verificar las credenciales del usuario en la base de datos
  const sql = 'SELECT * FROM user WHERE mail =? AND password =?';

  // Realizar la consulta a la base de datos
  connection.query(sql, [email, contraseña], (err, results) => {
    if (err) {
      console.error('Error al verificar las credenciales:', err);
      res.status(400).send('Error interno del servidor');
      return;
    }

    if (results.length > 0) {
      // Si se encontraron resultados, las credenciales son válidas
      // Establecer una variable de sesión para el usuario
      req.session.loggedin = true;
      // Redirigir al usuario a la página de React
      res.redirect('http://127.0.0.1:5500/login.html');
    } else {
      // Si no se encontraron resultados, las credenciales son inválidas
      // Renderizar la misma página de inicio de sesión con un mensaje de error
      res.redirect('http://192.168.10.11:3000');
    }
  });
});



// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
