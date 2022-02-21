import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar")); // pasta passada para salvar infos

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

// para o / pois os paths estao todos no index
usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
    "/avatar",
    ensureAuthenticated, // Passando middleware nas rotas
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

export { usersRoutes };
