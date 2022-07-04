"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _CreateUserController = require("../../../../modules/accounts/useCases/createUser/CreateUserController");

var _ProfileUserController = require("../../../../modules/accounts/useCases/profileUserUseCase/ProfileUserController");

var _UpdateUserAvatarController = require("../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRoutes = (0, _express.Router)();
exports.usersRoutes = usersRoutes;
const uploadAvatar = (0, _multer.default)(_upload.default); // pasta passada para salvar infos

const createUserController = new _CreateUserController.CreateUserController();
const updateUserAvatarController = new _UpdateUserAvatarController.UpdateUserAvatarController();
const profileUserController = new _ProfileUserController.ProfileUserController(); // para o / pois os paths estao todos no index

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch("/avatar", _ensureAuthenticated.ensureAuthenticated, // Passando middleware nas rotas
uploadAvatar.single("avatar"), updateUserAvatarController.handle);
usersRoutes.get("/profile", _ensureAuthenticated.ensureAuthenticated, profileUserController.handle);