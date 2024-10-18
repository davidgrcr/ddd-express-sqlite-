const sqlite3 = require("sqlite3").verbose();
const { resolve } = require("path");

// `__dirname` es soportado directamente en CommonJS
const db = new sqlite3.Database(
  resolve(__dirname, "database.sqlite"),
  (err) => {
    if (err) {
      console.error("Error obrint la base de dades", err.message);
    } else {
      console.log("Connexió amb SQLite establerta.");
      // Crear la taula 'users' si no existeix
      db.run(
        `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE NOT NULL
      )
    `,
        (err) => {
          if (err) {
            console.error("Error al crear la taula 'users'", err.message);
          } else {
            // Inserir un usuari per defecte si no existeix cap
            db.get("SELECT COUNT(*) AS count FROM users", (err, row) => {
              if (err) {
                console.error(
                  "Error al verificar si hi ha usuaris",
                  err.message
                );
              } else if (row.count === 0) {
                // Inserir l'usuari per defecte
                db.run(
                  "INSERT INTO users (name, email) VALUES (?, ?)",
                  ["Admin", "admin@example.com"],
                  (err) => {
                    if (err) {
                      console.error(
                        "Error al crear l'usuari per defecte",
                        err.message
                      );
                    } else {
                      console.log("Usuari per defecte creat: Admin");
                    }
                  }
                );
              } else {
                console.log(
                  "Ja hi ha usuaris existents, no es crea l'usuari per defecte."
                );
              }
            });
          }
        }
      );
    }
  }
);

// Exportar funciones con module.exports
const run = (...args) => db.run(...args);
const get = (...args) => db.get(...args);
const all = (...args) => db.all(...args);

module.exports = { run, get, all };
