"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRepository = void 0;
class UserRepository {
  constructor() {
    this.users = [];
  }
  async create({
    name,
    email,
    password,
    id,
    avatar
  }) {
    const user = {
      name,
      email,
      password,
      id: '123',
      avatar: '',
      created_at: new Date(),
      is_admin: false
    };
    this.users.push(user);
    return user;
  }
  async list() {
    return this.users;
  }
  async findByEmail(email) {
    return this.users.find(user => user.email === email);
  }
  async findById(id) {
    return this.users.find(user => user.id === id);
  }
}
exports.UserRepository = UserRepository;