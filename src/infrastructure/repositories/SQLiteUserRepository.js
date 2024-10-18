const User = require('../../domain/user/User');
const UserRepository = require('../../domain/user/UserRepository');
const { run, get, all } = require('../database/SQLiteConnection');

class SQLiteUserRepository extends UserRepository {
  async save(user) {
    return new Promise((resolve, reject) => {
      const { id, name, email } = user;
      const query = id
        ? "UPDATE users SET name = ?, email = ? WHERE id = ?"
        : "INSERT INTO users (name, email) VALUES (?, ?)";

      const params = id ? [name, email, id] : [name, email];

      run(query, params, function (err) {
        if (err) {
          reject(err);
        } else {
          if (!id) {
            user.id = this.lastID;
          }
          resolve(user);
        }
      });
    });
  }

  async findById(id) {
    return new Promise((resolve, reject) => {
      get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? new User(row.id, row.name, row.email) : null);
        }
      });
    });
  }

  async findAll() {
    return new Promise((resolve, reject) => {
      all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map((row) => new User(row.id, row.name, row.email)));
        }
      });
    });
  }

  async deleteById(id) {
    return new Promise((resolve, reject) => {
      run("DELETE FROM users WHERE id = ?", [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = SQLiteUserRepository;
