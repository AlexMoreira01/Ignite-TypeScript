// Importar todas as rotas existentes
import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRoutes } from "./password.routes";
import { rentalRoutes } from "./rental.routes";
import { specicationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

// sempre iniciara com categorie agora e daqui é chamado as rotas
router.use("/categories", categoriesRoutes); // Middlewares rota caregories
router.use("/specifications", specicationsRoutes); // Middlewares rota caregories
router.use("/users", usersRoutes); // apontando para as rotas de usuarios
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes);
router.use("/password", passwordRoutes);
router.use(authenticateRoutes); // passsar somente com / sem chamar outro sem o path no naveegador

export { router };
