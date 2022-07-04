"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specicationsRoutes = void 0;

var _express = require("express");

var _CreateSpecificationController = require("../../../../modules/cars/useCases/createSpecification/CreateSpecificationController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const specicationsRoutes = (0, _express.Router)();
exports.specicationsRoutes = specicationsRoutes;
const createSpecificationController = new _CreateSpecificationController.CreateSpecificationController(); // specicationsRoutes.use(ensureAuthenticated);
// Passa o request e response como um midlleaware autoamtico

specicationsRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createSpecificationController.handle);