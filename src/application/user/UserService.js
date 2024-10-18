const User = require('../../domain/user/User');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserById(id) {
    return await this.userRepository.findById(id);
  }

  async createUser(name, email) {
    const user = new User(null, name, email);
    return await this.userRepository.save(user);
  }

  async updateUser(id, name, email) {
    const user = await this.userRepository.findById(id);
    if (user) {
      user.updateName(name);
      user.email = email;
      return await this.userRepository.save(user);
    }
    throw new Error("Usuari no trobat");
  }

  async deleteUser(id) {
    return await this.userRepository.deleteById(id);
  }
}

module.exports = UserService;
