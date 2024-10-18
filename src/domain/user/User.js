class User {
    constructor(id, name, email) {
      this.id = id;
      this.name = name;
      this.email = email;
    }
  
    updateName(name) {
      this.name = name;
    }
  }
  
module.exports = User;  