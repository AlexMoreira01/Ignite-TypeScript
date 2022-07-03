"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = require("express");

var _authenticate = require("./authenticate.routes");

var _cars = require("./cars.routes");

var _categories = require("./categories.routes");

var _password = require("./password.routes");

var _rental = require("./rental.routes");

var _specifications = require("./specifications.routes");

var _users = require("./users.routes");

// Importar todas as rotas existentes
const router = (0, _express.Router)(); // sempre iniciara com categorie agora e daqui é chamado as rotas

exports.router = router;
router.use("/categories", _categories.categoriesRoutes); // Middlewares rota caregories

router.use("/specifications", _specifications.specicationsRoutes); // Middlewares rota caregories

router.use("/users", _users.usersRoutes); // apontando para as rotas de usuarios

router.use("/cars", _cars.carsRoutes);
router.use("/rentals", _rental.rentalRoutes);
router.use("/password", _password.passwordRoutes);
router.use(_authenticate.authenticateRoutes); // passsar somente com / sem chamar outro sem o path no naveegador