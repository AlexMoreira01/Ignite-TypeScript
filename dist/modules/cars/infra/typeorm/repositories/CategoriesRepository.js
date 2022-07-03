"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepository = void 0;

var _typeorm = require("typeorm");

var _Category = require("../entities/Category");

class CategoriesRepository {
  // private deixa o acesso restrito a somente essa classe
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Category.Category); // O repositorio é do tipo getRepository passando a entidade
  }

  async create({
    description,
    name
  }) {
    // Cria a entidade para ser salva
    const category = this.repository.create({
      description,
      name
    });
    await this.repository.save(category);
  }

  async list() {
    const categories = await this.repository.find(); // vai retornar uma promise -- ver ao passar o mouse

    return categories; // Retornando a lista
  }

  async findByName(name) {
    const category = await this.repository.findOne({
      name
    });
    return category;
  }

}

exports.CategoriesRepository = CategoriesRepository;