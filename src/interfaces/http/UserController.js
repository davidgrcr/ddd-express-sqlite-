class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  configureRoutes(router) {
    router.get("/users", this.getAllUsers.bind(this));
    router.get("/users/:id", this.getUserById.bind(this));
    router.post("/users", this.createUser.bind(this));
    router.put("/users/:id", this.updateUser.bind(this));
    router.delete("/users/:id", this.deleteUser.bind(this));
  }

  async getAllUsers(req, res) {
    const users = await this.userService.getAllUsers();
    res.json(users);
  }

  async getUserById(req, res) {
    const { id } = req.params;
    const user = await this.userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuari no trobat" });
    }
    res.json(user);
  }

  async createUser(req, res) {
    const { name, email } = req.body;
    const user = await this.userService.createUser(name, email);
    res.json(user);
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await this.userService.updateUser(id, name, email);
    res.json(user);
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    await this.userService.deleteUser(id);
    res.send("Usuari eliminat");
  }
}

module.exports = UserController;

